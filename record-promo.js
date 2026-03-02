/**
 * CulinaryAI Promo → MP4 recorder
 * Uses puppeteer-core (existing Chrome) + ffmpeg
 * Run: node record-promo.js
 */

const puppeteer = require('puppeteer-core');
const { spawn }  = require('child_process');
const path       = require('path');
const fs         = require('fs');
const os         = require('os');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FILE_PATH   = path.join(__dirname, 'promo-video.html');
const OUTPUT      = path.join(__dirname, 'culinaryai-promo.mp4');
const WIDTH       = 1280;
const HEIGHT      = 720;
const FPS         = 24;

// Match the promo slide durations + 2s buffer
const DURATIONS   = [4500,4000,4000,4000,4000,4500,4500,4500,4500,4500,4000,4000,4000,5000,5000];
const TOTAL_MS    = DURATIONS.reduce((a, b) => a + b, 0) + 2500;

async function record() {
  // Temp dir for PNG frames
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'promo-frames-'));
  console.log(`\n🎬 CulinaryAI Promo Recorder`);
  console.log(`   Duration : ${(TOTAL_MS / 1000).toFixed(1)}s`);
  console.log(`   FPS      : ${FPS}`);
  console.log(`   Output   : ${OUTPUT}\n`);

  // ── 1. Launch Chrome ──────────────────────────────────────────────────────
  console.log('Launching Chrome…');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,           // visible so you can see it recording
    args: [
      `--window-size=${WIDTH + 16},${HEIGHT + 88}`,
      '--disable-web-security',
      '--allow-file-access-from-files',
      '--no-first-run',
      '--no-default-browser-check',
    ],
  });

  const [page] = await browser.pages();
  await page.setViewport({ width: WIDTH, height: HEIGHT });

  console.log('Loading promo…');
  await page.goto(`file://${FILE_PATH}`, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait 1.5s for first slide animation to start
  await delay(1500);

  // ── 2. Capture frames ─────────────────────────────────────────────────────
  const intervalMs   = Math.round(1000 / FPS);
  const totalFrames  = Math.ceil(TOTAL_MS / intervalMs);
  let   frame        = 0;
  const captureStart = Date.now();

  console.log(`Capturing frames (${totalFrames} total)…`);
  console.log('─'.repeat(50));

  while (Date.now() - captureStart < TOTAL_MS) {
    const t0         = Date.now();
    const screenshot = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
    const padded     = String(frame).padStart(6, '0');
    fs.writeFileSync(path.join(tempDir, `f${padded}.png`), screenshot);
    frame++;

    // Progress log every 5s
    if (frame % (FPS * 5) === 0) {
      const elapsed = ((Date.now() - captureStart) / 1000).toFixed(0);
      const pct     = Math.round(frame / totalFrames * 100);
      console.log(`  ⏱  ${elapsed}s / ${(TOTAL_MS/1000).toFixed(0)}s  —  ${frame} frames  (${pct}%)`);
    }

    // Throttle to target FPS (screenshots are async so subtract their cost)
    const took = Date.now() - t0;
    if (took < intervalMs) await delay(intervalMs - took);
  }

  await browser.close();
  console.log(`\n✅ Captured ${frame} frames in ${((Date.now() - captureStart)/1000).toFixed(1)}s`);

  // ── 3. Encode MP4 with ffmpeg ─────────────────────────────────────────────
  console.log('\nEncoding MP4…');
  await new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', [
      '-y',
      '-framerate', String(FPS),
      '-pattern_type', 'glob',
      '-i', path.join(tempDir, 'f*.png'),
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', '18',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      OUTPUT,
    ]);

    ff.stderr.on('data', d => process.stdout.write(d.toString()));
    ff.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });

  // ── 4. Cleanup ────────────────────────────────────────────────────────────
  fs.rmSync(tempDir, { recursive: true, force: true });

  const sizeMB = (fs.statSync(OUTPUT).size / 1024 / 1024).toFixed(1);
  console.log(`\n🎉 Done!`);
  console.log(`   File : ${OUTPUT}`);
  console.log(`   Size : ${sizeMB} MB`);
  console.log(`\nOpen with: open "${OUTPUT}"`);
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

record().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
