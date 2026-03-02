/* ═══════════════════════════════════════════════
   CulinaryAI — Complete App Logic
   ═══════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════
   OPENAI CONFIGURATION
══════════════════════════════════════ */
const OPENAI_KEY_STORAGE = 'culinaryai_openai_key';
const OPENAI_API = 'https://api.openai.com/v1/chat/completions';
const PROXY_API = 'https://kyawzin-ccna--culinaryai-main.modal.run/api/chat';
const OPENAI_MODEL = 'gpt-4o-mini';
const LANG_STORAGE = 'culinaryai_lang';

/* ══════════════════════════════════════
   MULTI-LANGUAGE TRANSLATIONS
══════════════════════════════════════ */
const TRANSLATIONS = {
  en: {
    nav_cuisines: 'Cuisines', nav_recipes: 'Recipes', nav_ai: 'AI Chef', nav_tools: 'Tools', nav_videos: '🎬 Videos',
    hero_badge: '✨ AI-Powered Culinary Experience',
    hero_sub: 'Explore 5-star recipes from India, China, Korea, Thailand, Vietnam, Myanmar, and beyond.',
    search_ph: 'Search recipes, ingredients, cuisines...',
    filter_all: 'All', filter_indian: 'Indian', filter_chinese: 'Chinese', filter_korean: 'Korean',
    filter_thai: 'Thai', filter_vietnamese: 'Vietnamese', filter_myanmar: 'Myanmar',
    filter_bakery: 'Bakery', filter_luxury: 'Luxury',
    section_recipes: 'Signature Recipes', recipe_sub: 'Curated, tested, and perfected for your kitchen',
    load_more: 'Load More Recipes', chat_ph: 'Ask anything about cooking...',
    send: 'Send', save: 'Save', full_recipe: 'Full Recipe', watch_video: 'Watch Video',
    ask_ai: 'Ask AI Chef', calories_est: 'Estimated',
  },
  mm: {
    nav_cuisines: 'ချက်ပြုတ်နည်းများ', nav_recipes: 'ချက်နည်း', nav_ai: 'AI ဆရာချက်', nav_tools: 'ကိရိယာ', nav_videos: '🎬 ဗီဒီယို',
    hero_badge: '✨ AI-ဖြင့် ချက်ပြုတ်နည်း',
    hero_sub: 'အိန္ဒိယ၊ တရုတ်၊ ကိုရီးယား၊ ထိုင်း၊ ဗီယက်နမ်၊ မြန်မာနိုင်ငံ ချက်နည်းများ',
    search_ph: 'ချက်နည်း၊ ပါဝင်ပစ္စည်း ရှာဖွေပါ...',
    filter_all: 'အားလုံး', filter_indian: 'အိန္ဒိယ', filter_chinese: 'တရုတ်', filter_korean: 'ကိုရီးယား',
    filter_thai: 'ထိုင်း', filter_vietnamese: 'ဗီယက်နမ်', filter_myanmar: 'မြန်မာ',
    filter_bakery: 'ဖုတ်မုန့်', filter_luxury: 'ဇိမ်ခံ',
    section_recipes: 'ရွေးချယ်ထားသော ချက်နည်းများ', recipe_sub: 'စစ်ဆေး၍ ပြင်ဆင်ထားသော ချက်နည်းများ',
    load_more: 'ချက်နည်း ထပ်ကြည့်မည်', chat_ph: 'ချက်ပြုတ်ခြင်းနှင့် မေးမြန်းပါ...',
    send: 'ပို့မည်', save: 'သိမ်းမည်', full_recipe: 'ချက်နည်းပြည့်', watch_video: 'ဗီဒီယိုကြည့်',
    ask_ai: 'AI ကိုမေးပါ', calories_est: 'ခန့်မှန်းချက်',
  },
  ko: {
    nav_cuisines: '요리', nav_recipes: '레시피', nav_ai: 'AI 셰프', nav_tools: '도구', nav_videos: '🎬 동영상',
    hero_badge: '✨ AI 기반 요리 경험',
    hero_sub: '인도, 중국, 한국, 태국, 베트남, 미얀마의 최고급 레시피',
    search_ph: '레시피, 재료, 요리 검색...',
    filter_all: '전체', filter_indian: '인도', filter_chinese: '중국', filter_korean: '한국',
    filter_thai: '태국', filter_vietnamese: '베트남', filter_myanmar: '미얀마',
    filter_bakery: '베이커리', filter_luxury: '파인다이닝',
    section_recipes: '시그니처 레시피', recipe_sub: '엄선되고 완벽하게 검증된 레시피',
    load_more: '레시피 더 보기', chat_ph: '요리에 대해 무엇이든 물어보세요...',
    send: '전송', save: '저장', full_recipe: '전체 레시피', watch_video: '동영상 보기',
    ask_ai: 'AI 셰프에게 물어보기', calories_est: '추정치',
  },
  zh: {
    nav_cuisines: '菜系', nav_recipes: '食谱', nav_ai: 'AI厨师', nav_tools: '工具', nav_videos: '🎬 视频',
    hero_badge: '✨ AI驱动的烹饪体验',
    hero_sub: '探索印度、中国、韩国、泰国、越南、缅甸等地的顶级食谱',
    search_ph: '搜索食谱、食材、菜系...',
    filter_all: '全部', filter_indian: '印度', filter_chinese: '中国', filter_korean: '韩国',
    filter_thai: '泰国', filter_vietnamese: '越南', filter_myanmar: '缅甸',
    filter_bakery: '烘焙', filter_luxury: '精致料理',
    section_recipes: '招牌食谱', recipe_sub: '精心挑选、测试和完善的厨房食谱',
    load_more: '加载更多食谱', chat_ph: '问任何关于烹饪的问题...',
    send: '发送', save: '收藏', full_recipe: '完整食谱', watch_video: '观看视频',
    ask_ai: '问AI厨师', calories_est: '估算',
  },
  th: {
    nav_cuisines: 'อาหาร', nav_recipes: 'สูตร', nav_ai: 'เชฟ AI', nav_tools: 'เครื่องมือ', nav_videos: '🎬 วิดีโอ',
    hero_badge: '✨ ประสบการณ์การทำอาหารด้วย AI',
    hero_sub: 'สำรวจสูตรอาหารระดับ 5 ดาวจากอินเดีย จีน เกาหลี ไทย เวียดนาม เมียนมา',
    search_ph: 'ค้นหาสูตรอาหาร วัตถุดิบ อาหาร...',
    filter_all: 'ทั้งหมด', filter_indian: 'อินเดีย', filter_chinese: 'จีน', filter_korean: 'เกาหลี',
    filter_thai: 'ไทย', filter_vietnamese: 'เวียดนาม', filter_myanmar: 'เมียนมา',
    filter_bakery: 'เบเกอรี่', filter_luxury: 'ไฟน์ไดนิ่ง',
    section_recipes: 'สูตรอาหารซิกเนเจอร์', recipe_sub: 'คัดสรร ทดสอบ และปรุงแต่งเพื่อครัวของคุณ',
    load_more: 'โหลดสูตรอาหารเพิ่มเติม', chat_ph: 'ถามอะไรก็ได้เกี่ยวกับการทำอาหาร...',
    send: 'ส่ง', save: 'บันทึก', full_recipe: 'สูตรเต็ม', watch_video: 'ดูวิดีโอ',
    ask_ai: 'ถามเชฟ AI', calories_est: 'ประมาณ',
  },
  vi: {
    nav_cuisines: 'Ẩm thực', nav_recipes: 'Công thức', nav_ai: 'Bếp trưởng AI', nav_tools: 'Công cụ', nav_videos: '🎬 Video',
    hero_badge: '✨ Trải nghiệm nấu ăn với AI',
    hero_sub: 'Khám phá công thức 5 sao từ Ấn Độ, Trung Quốc, Hàn Quốc, Thái Lan, Việt Nam, Myanmar',
    search_ph: 'Tìm kiếm công thức, nguyên liệu...',
    filter_all: 'Tất cả', filter_indian: 'Ấn Độ', filter_chinese: 'Trung Quốc', filter_korean: 'Hàn Quốc',
    filter_thai: 'Thái Lan', filter_vietnamese: 'Việt Nam', filter_myanmar: 'Myanmar',
    filter_bakery: 'Bánh mì', filter_luxury: 'Cao cấp',
    section_recipes: 'Công thức đặc trưng', recipe_sub: 'Tuyển chọn, thử nghiệm và hoàn thiện cho bếp của bạn',
    load_more: 'Tải thêm công thức', chat_ph: 'Hỏi bất cứ điều gì về nấu ăn...',
    send: 'Gửi', save: 'Lưu', full_recipe: 'Công thức đầy đủ', watch_video: 'Xem video',
    ask_ai: 'Hỏi bếp trưởng AI', calories_est: 'Ước tính',
  },
  hi: {
    nav_cuisines: 'व्यंजन', nav_recipes: 'रेसिपी', nav_ai: 'AI शेफ', nav_tools: 'उपकरण', nav_videos: '🎬 वीडियो',
    hero_badge: '✨ AI-संचालित पाक अनुभव',
    hero_sub: 'भारत, चीन, कोरिया, थाईलैंड, वियतनाम, म्यांमार से 5-स्टार रेसिपी',
    search_ph: 'रेसिपी, सामग्री, व्यंजन खोजें...',
    filter_all: 'सभी', filter_indian: 'भारतीय', filter_chinese: 'चीनी', filter_korean: 'कोरियाई',
    filter_thai: 'थाई', filter_vietnamese: 'वियतनामी', filter_myanmar: 'म्यांमारी',
    filter_bakery: 'बेकरी', filter_luxury: 'लक्जरी',
    section_recipes: 'हस्ताक्षर रेसिपी', recipe_sub: 'आपकी रसोई के लिए चुनी, परखी और परिपूर्ण रेसिपी',
    load_more: 'और रेसिपी लोड करें', chat_ph: 'खाना पकाने के बारे में कुछ भी पूछें...',
    send: 'भेजें', save: 'सहेजें', full_recipe: 'पूरी रेसिपी', watch_video: 'वीडियो देखें',
    ask_ai: 'AI शेफ से पूछें', calories_est: 'अनुमानित',
  },
  ja: {
    nav_cuisines: '料理', nav_recipes: 'レシピ', nav_ai: 'AIシェフ', nav_tools: 'ツール', nav_videos: '🎬 動画',
    hero_badge: '✨ AI料理体験',
    hero_sub: 'インド、中国、韓国、タイ、ベトナム、ミャンマーの5つ星レシピ',
    search_ph: 'レシピ、食材、料理を検索...',
    filter_all: 'すべて', filter_indian: 'インド', filter_chinese: '中国', filter_korean: '韓国',
    filter_thai: 'タイ', filter_vietnamese: 'ベトナム', filter_myanmar: 'ミャンマー',
    filter_bakery: 'ベーカリー', filter_luxury: '高級料理',
    section_recipes: 'シグネチャーレシピ', recipe_sub: '厳選、テスト済みのレシピ',
    load_more: 'さらにレシピを読み込む', chat_ph: '料理について何でも聞いてください...',
    send: '送信', save: '保存', full_recipe: 'フルレシピ', watch_video: '動画を見る',
    ask_ai: 'AIシェフに聞く', calories_est: '推定値',
  },
};

const CHEF_SYSTEM_PROMPT = `You are Chef AI, an expert culinary assistant built exclusively for CulinaryAI.

STRICT SCOPE RULE — CRITICAL:
You ONLY answer questions about:
• Cooking, recipes, and meal preparation
• Ingredients, substitutions, and cooking techniques
• Cuisine traditions (Indian, Chinese, Thai, Vietnamese, Myanmar, Western, etc.)
• Baking and pastry
• Kitchen tools and equipment
• Nutrition, calories, macros, and dietary information (protein, carbs, fat, fiber, sodium)
• Food safety, storage, and preservation
• Menu planning and portion sizing
• Flavor pairings and taste profiles

If a user asks about ANYTHING outside cooking and food (e.g. politics, math, coding, sports, relationships, history, weather, travel, AI, other topics), you MUST respond ONLY with this exact message:
"🍳 I'm a cooking-only assistant! I can't help with that topic. Ask me anything about recipes, techniques, ingredients, nutrition, or cuisine — I'm here to help you cook better! 👨‍🍳"

PERSONALITY & STYLE:
• Warm, enthusiastic, and encouraging
• Give practical, actionable advice
• Include calorie/nutrition data when relevant
• Use food emojis naturally (🍛🍜🥘🫕🥗🍝🍣🥗)
• For recipes, structure with ingredients and numbered steps
• Always mention chef tips and professional techniques
• Reference specific dishes from our menu (Butter Chicken, Biryani, Pad Thai, Mohinga, etc.) when relevant`;

/* ══════════════════════════════════════
   RECIPES DATABASE
══════════════════════════════════════ */
const RECIPES = [
  // ── INDIAN ──
  {
    id: 'butter-chicken', name: 'Butter Chicken', cuisine: 'indian', stars: 5,
    cookStyle: 'one-pan', difficulty: 'Medium', time: '45 min', serves: 4, calories: 480,
    emoji: '🍗', color: 'linear-gradient(135deg, #FF6B35, #F7931E)',
    photo: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80',
    tags: ['chicken', 'curry', 'creamy', 'popular'],
    description: 'Tender chicken in a rich, velvety tomato-cream sauce. India\'s most beloved curry, perfected with aromatic spices.',
    ingredients: ['800g chicken thighs, cubed', '400g crushed tomatoes', '200ml heavy cream', '2 tbsp butter', '1 tbsp ginger-garlic paste', '2 tsp garam masala', '1 tsp turmeric', '1 tsp chili powder', '1 tsp cumin', 'Salt to taste', 'Fresh coriander to garnish'],
    steps: ['Marinate chicken with yogurt, turmeric, chili & garam masala for 30 min', 'Grill or pan-sear chicken until slightly charred', 'In a pan, melt butter & sauté onions until golden', 'Add ginger-garlic paste, cook 2 min', 'Add tomatoes, cook until oil separates (15 min)', 'Blend the sauce smooth, return to pan', 'Add cream, kasuri methi & simmer 10 min', 'Add chicken, simmer 10 min & garnish with cream and coriander'],
    tip: 'The secret is kasuri methi (dried fenugreek leaves) — crush between palms before adding for maximum aroma.'
  },
  {
    id: 'biryani', name: 'Chicken Biryani', cuisine: 'indian', stars: 5,
    cookStyle: 'slow-cooked', difficulty: 'Hard', time: '90 min', serves: 6, calories: 620,
    emoji: '🍚', color: 'linear-gradient(135deg, #FF8C00, #CC5500)',
    photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
    tags: ['rice', 'chicken', 'aromatic', 'festive'],
    description: 'Layered fragrant basmati rice with spiced chicken, saffron, and caramelized onions. The crown jewel of Indian cuisine.',
    ingredients: ['1kg chicken pieces', '500g basmati rice (soaked 30 min)', '3 large onions, thinly sliced', '200g yogurt', '50ml milk + pinch of saffron', '3 tbsp ghee', '2 tbsp biryani masala', '1 tsp turmeric', 'Whole spices: bay leaves, cardamom, cloves, cinnamon', 'Fresh mint & coriander', 'Fried onions for topping'],
    steps: ['Marinate chicken in yogurt, biryani masala, turmeric & fried onions', 'Parboil rice with whole spices until 70% cooked', 'Cook marinated chicken until done', 'Layer rice over chicken in heavy pot', 'Pour saffron milk & ghee over rice', 'Top with fried onions & fresh herbs', 'Seal pot tightly & cook on dum (low heat) 20-25 min', 'Mix gently from bottom and serve hot'],
    tip: 'Seal the pot with dough or foil for authentic dum cooking — the steam trapped inside cooks and infuses the rice.'
  },
  {
    id: 'palak-paneer', name: 'Palak Paneer', cuisine: 'indian', stars: 4,
    cookStyle: 'one-pan', difficulty: 'Easy', time: '30 min', serves: 4, calories: 320,
    emoji: '🥬', color: 'linear-gradient(135deg, #22C55E, #15803D)',
    photo: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=600&q=80',
    tags: ['vegetarian', 'spinach', 'cheese', 'healthy'],
    description: 'Fresh paneer cubes in a silky smooth spinach sauce. Vibrant green, nutritious and utterly comforting.',
    ingredients: ['300g paneer, cubed', '500g fresh spinach', '2 tomatoes', '2 onions', '1 tbsp ginger-garlic paste', '200ml cream', '1 tsp cumin', '1 tsp garam masala', '½ tsp nutmeg', 'Salt & pepper'],
    steps: ['Blanch spinach in boiling water for 2 min, then ice bath', 'Blend spinach smooth', 'Pan-fry paneer cubes until golden, set aside', 'Sauté onions until golden, add ginger-garlic', 'Add tomatoes, cook down', 'Add spinach purée & spices', 'Simmer 10 min, add cream', 'Fold in paneer & serve'],
    tip: 'Adding a pinch of nutmeg to the spinach sauce adds incredible depth. Never overcook the spinach or it loses its vibrant green color.'
  },
  {
    id: 'dal-makhani', name: 'Dal Makhani', cuisine: 'indian', stars: 5,
    cookStyle: 'slow-cooked', difficulty: 'Medium', time: '8 hours', serves: 6, calories: 380,
    emoji: '🫘', color: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
    photo: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
    tags: ['lentils', 'vegetarian', 'slow-cook', 'comfort'],
    description: 'Slow-cooked black lentils simmered overnight with butter, cream and spices. Pure, soul-warming comfort food.',
    ingredients: ['250g whole black lentils (urad dal)', '50g kidney beans', '100g butter', '200ml cream', '3 tomatoes, pureed', '1 tbsp ginger-garlic paste', '1 tsp garam masala', '1 tsp cumin', '2 tsp chili powder', 'Fresh cream & butter to serve'],
    steps: ['Soak lentils & kidney beans overnight', 'Pressure cook until very soft (45 min)', 'In a heavy pot, melt butter & sauté onions', 'Add ginger-garlic paste, tomato purée, spices', 'Add cooked lentils, mix well', 'Simmer on very low heat for 2-3 hours', 'Add cream, simmer 30 more min', 'Finish with a large knob of cold butter'],
    tip: 'The longer you cook it, the better it tastes. Restaurant versions cook it for 8+ hours. Cold butter added at the end creates a luxurious silky finish.'
  },
  // ── CHINESE ──
  {
    id: 'kung-pao-chicken', name: 'Kung Pao Chicken', cuisine: 'chinese', stars: 5,
    cookStyle: 'stir-fry', difficulty: 'Medium', time: '25 min', serves: 4, calories: 420,
    emoji: '🌶️', color: 'linear-gradient(135deg, #C1292E, #E63946)',
    photo: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80',
    tags: ['chicken', 'spicy', 'nuts', 'stir-fry'],
    description: 'Classic Sichuan stir-fry with tender chicken, peanuts, and dried chilies in a bold sweet-savory sauce.',
    ingredients: ['500g chicken breast, diced', '80g peanuts, dry-roasted', '10 dried red chilies', '3 scallions, sliced', 'For sauce: 2 tbsp soy sauce, 1 tbsp dark soy, 1 tbsp Shaoxing wine, 1 tbsp rice vinegar, 1 tsp sugar, 1 tsp cornstarch', '1 tsp Sichuan peppercorns', '3 garlic cloves', '1 tsp ginger, minced'],
    steps: ['Marinate chicken with soy sauce, cornstarch & Shaoxing wine for 15 min', 'Mix all sauce ingredients in a bowl', 'Heat wok until smoking, add oil', 'Stir-fry dried chilies & Sichuan peppercorns 30 sec', 'Add chicken, cook on high heat until just done', 'Add garlic, ginger, scallions', 'Pour in sauce, toss quickly 1 min', 'Add peanuts and serve immediately'],
    tip: 'The secret to wok hei is maximum heat and quick movement. Have all ingredients ready before you start — this dish cooks in under 5 minutes.'
  },
  {
    id: 'dim-sum', name: 'Har Gow (Shrimp Dumplings)', cuisine: 'chinese', stars: 5,
    cookStyle: 'steamed', difficulty: 'Hard', time: '90 min', serves: 6, calories: 220,
    emoji: '🥟', color: 'linear-gradient(135deg, #EC4899, #BE185D)',
    photo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80',
    tags: ['dumplings', 'shrimp', 'steamed', 'dim-sum'],
    description: 'Translucent crystal shrimp dumplings — the crown jewel of Cantonese dim sum with silky smooth wrappers.',
    ingredients: ['For wrappers: 200g wheat starch, 50g tapioca starch, 250ml boiling water', 'For filling: 400g shrimp, 100g water chestnuts, 1 tbsp sesame oil, 1 tsp sugar, 1 tsp cornstarch, Salt & white pepper'],
    steps: ['Mix wheat starch & tapioca starch, pour boiling water, mix quickly', 'Knead until smooth while warm, rest covered 10 min', 'Mince shrimp & water chestnuts, season filling', 'Roll dough thin, cut circles with cutter', 'Place filling in center, fold and pleat tightly', 'Steam on parchment over boiling water 8-10 min', 'Serve immediately with soy sauce & chili oil'],
    tip: 'The wrappers must be made with boiling water — this gelatinizes the starch for the characteristic translucent texture. Work fast while warm!'
  },
  {
    id: 'mapo-tofu', name: 'Mapo Tofu', cuisine: 'chinese', stars: 4,
    cookStyle: 'one-pan', difficulty: 'Medium', time: '20 min', serves: 4, calories: 280,
    emoji: '🫕', color: 'linear-gradient(135deg, #FF4500, #CC2200)',
    photo: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
    tags: ['tofu', 'spicy', 'sichuan', 'vegetarian-option'],
    description: 'Silken tofu in a fiery, numbing Sichuan sauce. Bold, complex and deeply satisfying.',
    ingredients: ['400g silken tofu, cubed', '200g ground pork (optional)', '3 tbsp doubanjiang (chili bean paste)', '1 tbsp fermented black beans', '2 tsp Sichuan peppercorns (ground)', '3 garlic cloves', '1 tsp ginger', '500ml chicken stock', '2 tsp cornstarch + water', 'Scallions & Sichuan pepper oil to finish'],
    steps: ['Brown ground pork in wok, set aside', 'Fry doubanjiang in oil 2 min until fragrant and oil turns red', 'Add fermented black beans, garlic, ginger', 'Add stock, bring to simmer', 'Gently add tofu cubes, simmer 3 min', 'Thicken with cornstarch slurry', 'Add pork back, finish with Sichuan pepper oil', 'Garnish generously with scallions & ground peppercorn'],
    tip: 'Use silken tofu for the authentic texture. The signature numbing sensation comes from Sichuan peppercorns — use more than you think you need!'
  },
  // ── THAI ──
  {
    id: 'pad-thai', name: 'Pad Thai', cuisine: 'thai', stars: 5,
    cookStyle: 'stir-fry', difficulty: 'Medium', time: '20 min', serves: 2, calories: 520,
    emoji: '🍜', color: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    photo: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&q=80',
    tags: ['noodles', 'shrimp', 'popular', 'stir-fry'],
    description: 'Thailand\'s iconic stir-fried rice noodles with shrimp, eggs, bean sprouts and a perfectly balanced sauce.',
    ingredients: ['200g flat rice noodles (soaked)', '200g shrimp, peeled', '2 eggs', '150g bean sprouts', '4 scallions', '80g firm tofu, diced', 'For sauce: 3 tbsp fish sauce, 2 tbsp palm sugar, 2 tbsp tamarind paste, 1 tbsp oyster sauce', 'Crushed peanuts, lime, chili flakes to serve'],
    steps: ['Mix sauce ingredients until sugar dissolves', 'Heat wok to very high heat, add oil', 'Fry tofu until golden, push to side', 'Add shrimp, cook until pink', 'Push to side, scramble eggs in center', 'Add noodles, pour sauce over, toss everything', 'Add bean sprouts & scallions, toss 1 min', 'Serve with peanuts, lime wedge & chili flakes'],
    tip: 'Use tamarind paste (not concentrate) for authentic flavor. The high heat creates slightly charred, smoky noodles — never stir too much, let them develop color.'
  },
  {
    id: 'green-curry', name: 'Thai Green Curry', cuisine: 'thai', stars: 5,
    cookStyle: 'one-pan', difficulty: 'Easy', time: '30 min', serves: 4, calories: 480,
    emoji: '🍛', color: 'linear-gradient(135deg, #22C55E, #0EA5E9)',
    photo: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80',
    tags: ['curry', 'coconut', 'chicken', 'aromatic'],
    description: 'Vibrant, aromatic Thai green curry with coconut milk, fresh green chilies and fragrant lemongrass.',
    ingredients: ['500g chicken breast', '400ml coconut milk', '3 tbsp green curry paste', '1 stalk lemongrass', '4 kaffir lime leaves', '1 tbsp fish sauce', '1 tsp palm sugar', '150g Thai eggplant', '1 red chili for garnish', 'Fresh Thai basil', 'Steamed jasmine rice to serve'],
    steps: ['Sear curry paste in coconut cream (top layer of coconut milk) 2-3 min', 'Add chicken, coat in paste', 'Add remaining coconut milk & ½ cup water', 'Add lemongrass, kaffir lime leaves', 'Simmer 15 min until chicken is cooked', 'Add eggplant, fish sauce & palm sugar', 'Cook 5 more min', 'Finish with Thai basil & serve over jasmine rice'],
    tip: 'Always fry curry paste in coconut cream first — this "cracking the cream" step is essential for depth of flavor and separates great curry from average curry.'
  },
  {
    id: 'tom-yum', name: 'Tom Yum Goong', cuisine: 'thai', stars: 5,
    cookStyle: 'quick', difficulty: 'Easy', time: '25 min', serves: 4, calories: 180,
    emoji: '🍲', color: 'linear-gradient(135deg, #F97316, #EF4444)',
    photo: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=600&q=80',
    tags: ['soup', 'shrimp', 'spicy-sour', 'aromatic'],
    description: 'Thailand\'s legendary hot and sour soup — bold, fragrant, fiery and deeply satisfying.',
    ingredients: ['500g large shrimp', '1L chicken or shrimp stock', '3 stalks lemongrass', '5 kaffir lime leaves', '5 slices galangal', '10 bird\'s eye chilies', '250g mushrooms (oyster or straw)', '3 tbsp fish sauce', '3 tbsp lime juice', 'Fresh coriander & scallions'],
    steps: ['Bring stock to boil with lemongrass, galangal, lime leaves', 'Simmer aromatics 10 min to infuse', 'Add mushrooms and chilies', 'Add shrimp, cook 3-4 min until pink', 'Season with fish sauce & lime juice', 'Taste — should be equally spicy, sour, salty and savory', 'Ladle into bowls, top with coriander'],
    tip: 'Add lime juice OFF the heat — cooking lime juice makes it bitter. For the cream version (Tom Kha), add coconut milk at the end.'
  },
  // ── VIETNAMESE ──
  {
    id: 'pho', name: 'Beef Phở', cuisine: 'vietnamese', stars: 5,
    cookStyle: 'slow-cooked', difficulty: 'Hard', time: '6 hours', serves: 6, calories: 420,
    emoji: '🍲', color: 'linear-gradient(135deg, #10B981, #047857)',
    photo: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80',
    tags: ['soup', 'beef', 'noodles', 'comfort', 'slow-cook'],
    description: 'Vietnam\'s soul-warming noodle soup with a deeply aromatic bone broth infused with star anise, cinnamon and charred ginger.',
    ingredients: ['2kg beef bones (marrow & knuckle)', '500g beef brisket', '400g rice noodles', 'Aromatics: 1 large onion, 5cm ginger, star anise, cinnamon, cloves, cardamom', '3 tbsp fish sauce', '1 tbsp sugar', 'Bean sprouts, Thai basil, lime, hoisin, sriracha to serve'],
    steps: ['Blanch bones in boiling water 5 min, discard water, clean bones', 'Char onion and ginger directly on flame until blackened', 'Toast spices in dry pan until fragrant', 'Simmer bones 4-5 hours, skimming frequently', 'Add brisket last hour of cooking, then slice thin', 'Strain broth, season with fish sauce & sugar', 'Prepare noodles, place in bowls', 'Ladle boiling broth over noodles, add raw beef slices'],
    tip: 'Charring the onion and ginger is NON-NEGOTIABLE — this caramelization creates the characteristic sweet, smoky depth that defines authentic phở.'
  },
  {
    id: 'banh-mi', name: 'Bánh Mì', cuisine: 'vietnamese', stars: 4,
    cookStyle: 'no-cook', difficulty: 'Easy', time: '30 min', serves: 4, calories: 380,
    emoji: '🥖', color: 'linear-gradient(135deg, #D97706, #92400E)',
    photo: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&q=80',
    tags: ['sandwich', 'pork', 'pickled', 'fresh'],
    description: 'The perfect Vietnamese baguette sandwich — crispy bread, savory pork, pickled vegetables and fresh herbs in every bite.',
    ingredients: ['4 crispy baguettes', '300g char siu pork or pâté', '200g pickled carrots & daikon (see tip)', 'Cucumber slices', 'Jalapeños', 'Fresh coriander', 'Mayonnaise', 'Maggi seasoning or soy sauce', 'Sriracha'],
    steps: ['Quick pickle: julienne carrots & daikon, toss with rice vinegar, sugar & salt, rest 20 min', 'Slice pork thin', 'Split baguette lengthwise, spread mayo on both sides', 'Layer with pork, pâté, cucumber', 'Add pickled vegetables & jalapeño', 'Top with coriander & drizzle Maggi & sriracha'],
    tip: 'The secret of bánh mì is contrast: warm bread vs cold pickles, creamy pâté vs crispy vegetables. Make the pickled vegetables at least 20 min ahead.'
  },
  // ── MYANMAR ──
  {
    id: 'mohinga', name: 'Mohinga', cuisine: 'myanmar', stars: 5,
    cookStyle: 'one-pan', difficulty: 'Medium', time: '60 min', serves: 6, calories: 380,
    emoji: '🐟', color: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
    photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
    tags: ['fish', 'soup', 'noodles', 'national-dish', 'breakfast'],
    description: 'Myanmar\'s beloved national dish — a hearty catfish soup with rice vermicelli, crispy fritters and a deeply aromatic broth.',
    ingredients: ['500g catfish (or any firm white fish)', '400g rice vermicelli', '2 stalks lemongrass', '3cm turmeric root (or 1 tsp powder)', '5 shallots', '4 garlic cloves', '2 tbsp fish sauce', '1 tsp shrimp paste', '50g banana stem, sliced thin', 'Chickpea fritters (kyar san)', 'Hard-boiled eggs, crispy onions, coriander to serve'],
    steps: ['Poach fish with lemongrass & turmeric until cooked, flake & set aside, reserve broth', 'Blend shallots, garlic, lemongrass, turmeric & shrimp paste into paste', 'Fry paste in oil until fragrant and golden', 'Add fish broth + 1L water, bring to simmer', 'Add banana stem & fish sauce', 'Thicken slightly with rice flour dissolved in water', 'Fold flaked fish back in', 'Serve over vermicelli with fritters, egg, crispy onions & coriander'],
    tip: 'The banana stem adds a unique texture and slightly bitter note. If unavailable, substitute with hearts of palm. The broth should be golden yellow from turmeric.'
  },
  {
    id: 'laphet-thohk', name: 'Laphet Thohk (Tea Leaf Salad)', cuisine: 'myanmar', stars: 5,
    cookStyle: 'no-cook', difficulty: 'Easy', time: '15 min', serves: 4, calories: 220,
    emoji: '🌿', color: 'linear-gradient(135deg, #059669, #7C3AED)',
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    tags: ['salad', 'tea-leaf', 'unique', 'vegetarian'],
    description: 'Myanmar\'s legendary fermented tea leaf salad — a complex, addictive mix of textures and flavors unlike anything else in the world.',
    ingredients: ['100g laphet (pickled/fermented tea leaves)', '50g fried split peas', '50g fried sesame seeds', '50g fried peanuts', '50g fried garlic slices', '50g fried dried shrimp', '3 tomatoes, finely diced', '4 green chilies, sliced', '2 garlic cloves, minced', 'Lime juice, fish sauce to taste', 'Fresh coriander'],
    steps: ['Arrange all the crunchy toppings around the edge of a large plate', 'Place laphet in the center', 'Scatter tomatoes, chilies and garlic over everything', 'Drizzle with lime juice and fish sauce', 'Mix everything together at the table with two spoons', 'Toss until well combined and all elements are distributed', 'Taste and adjust seasoning with more lime or fish sauce'],
    tip: 'This salad is all about last-minute assembly — mix just before eating to preserve the crunch of each element. The interplay of textures is what makes it magical.'
  },
  {
    id: 'shan-noodles', name: 'Shan Noodles', cuisine: 'myanmar', stars: 4,
    cookStyle: 'one-pan', difficulty: 'Easy', time: '30 min', serves: 4, calories: 440,
    emoji: '🍜', color: 'linear-gradient(135deg, #A855F7, #7C3AED)',
    photo: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80',
    tags: ['noodles', 'pork', 'tomato', 'comfort'],
    description: 'Hearty noodles from the Shan highlands of Myanmar — served with a savory tomato-pork sauce and topped with fresh herbs.',
    ingredients: ['400g fresh flat rice noodles', '300g ground pork', '4 tomatoes, finely chopped', '3 shallots', '3 garlic cloves', '1 tbsp tomato paste', '2 tbsp soy sauce', '1 tbsp fish sauce', '1 tsp turmeric', 'Chili oil, sesame oil to finish', 'Scallions, coriander, peanuts to serve'],
    steps: ['Fry shallots and garlic in oil until golden', 'Add ground pork, break up and brown', 'Add tomatoes and tomato paste, cook until soft', 'Season with soy sauce, fish sauce, turmeric', 'Simmer 15 min until sauce is thick', 'Blanch noodles in boiling water, drain', 'Divide noodles into bowls, spoon sauce over', 'Top with peanuts, scallions, coriander & chili oil'],
    tip: 'The key is cooking the tomatoes down until the sauce is thick and almost dry before serving. This concentrates the flavor beautifully.'
  },
  // ── KOREAN ──
  {
    id: 'bibimbap', name: 'Bibimbap', cuisine: 'korean', stars: 5,
    cookStyle: 'stir-fry', difficulty: 'Medium', time: '40 min', serves: 2, calories: 520,
    emoji: '🍚', color: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
    photo: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&q=80',
    tags: ['rice', 'vegetables', 'egg', 'balanced', 'korean'],
    description: 'Korea\'s most iconic dish — a vibrant bowl of seasoned rice crowned with colorful vegetables, a runny fried egg, and fiery gochujang sauce.',
    ingredients: ['2 cups cooked short-grain rice', '200g beef mince', '2 eggs', '1 zucchini, julienned', '1 carrot, julienned', '100g spinach', '100g bean sprouts', '100g shiitake mushrooms', '4 tbsp gochujang (Korean chili paste)', '2 tbsp sesame oil', '2 tbsp soy sauce', '1 tbsp sugar', '2 garlic cloves, minced', 'Sesame seeds, nori strips to serve'],
    steps: ['Season beef mince with soy sauce, garlic, sesame oil. Stir-fry over high heat until cooked', 'Blanch spinach 30 seconds, squeeze dry, season with sesame oil, garlic, salt', 'Sauté bean sprouts with sesame oil, salt. Set aside', 'Stir-fry carrot and zucchini separately, each 2 min with sesame oil', 'Sauté mushrooms with soy sauce and sesame oil until golden', 'Mix gochujang sauce: 4 tbsp gochujang, 1 tbsp sugar, 1 tbsp sesame oil, 1 tbsp water', 'Fry eggs sunny-side up — yolk must stay runny', 'Divide hot rice into bowls, arrange vegetables and beef in sections around the bowl', 'Top with fried egg, drizzle gochujang sauce, garnish with sesame seeds'],
    tip: 'The runny egg yolk is non-negotiable — it creates a natural sauce when you mix everything together. Use a heated stone bowl (dolsot) if you have one to create the coveted crispy rice bottom (nurungji).'
  },
  {
    id: 'kimchi-jjigae', name: 'Kimchi Jjigae (Kimchi Stew)', cuisine: 'korean', stars: 5,
    cookStyle: 'one-pan', difficulty: 'Easy', time: '35 min', serves: 4, calories: 310,
    emoji: '🍲', color: 'linear-gradient(135deg, #EF4444, #1D4ED8)',
    photo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    tags: ['stew', 'kimchi', 'pork', 'spicy', 'comfort', 'korean'],
    description: 'Korea\'s ultimate comfort stew — deeply sour, spicy, and satisfying. Best made with well-fermented kimchi for maximum depth of flavor.',
    ingredients: ['400g aged kimchi (well-fermented, at least 2-3 weeks old)', '200g pork belly, sliced', '300g firm tofu, cubed', '1 tbsp gochugaru (Korean chili flakes)', '1 tbsp gochujang', '2 tbsp soy sauce', '1 tsp sesame oil', '4 garlic cloves, minced', '1 tsp sugar', '3 cups water or anchovy broth', 'Green onions to serve'],
    steps: ['Stir-fry pork belly in a heavy pot until fat renders and edges crisp', 'Add kimchi with all its juice, stir-fry with pork 5 min', 'Add garlic, gochugaru, gochujang, stir and fry 2 min', 'Pour in broth, bring to boil', 'Add soy sauce, sugar. Reduce heat, simmer 20 min', 'Gently add tofu cubes without breaking', 'Simmer 10 more min. Adjust seasoning', 'Drizzle sesame oil, top with sliced green onions. Serve bubbling hot'],
    tip: 'The secret is WELL-FERMENTED kimchi. Fresh kimchi makes a sweet stew; aged kimchi makes an explosively complex one. Don\'t drain the kimchi juice — that\'s liquid gold for the broth.'
  },
  {
    id: 'korean-fried-chicken', name: 'Korean Fried Chicken', cuisine: 'korean', stars: 5,
    cookStyle: 'deep-fried', difficulty: 'Medium', time: '50 min', serves: 4, calories: 580,
    emoji: '🍗', color: 'linear-gradient(135deg, #F59E0B, #1D4ED8)',
    photo: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80',
    tags: ['chicken', 'fried', 'crispy', 'spicy', 'sweet', 'korean'],
    description: 'Double-fried Korean fried chicken with an impossibly thin, shatteringly crispy crust glazed in sweet-spicy yangnyeom sauce. Better than anything from a restaurant.',
    ingredients: ['1kg chicken wings or pieces', '1 cup potato starch', '1/4 cup all-purpose flour', '1 tsp salt, 1 tsp white pepper', '1/2 cup cold water', 'Oil for deep frying', 'For yangnyeom sauce: 4 tbsp gochujang, 3 tbsp honey, 2 tbsp soy sauce, 1 tbsp rice vinegar, 1 tbsp sesame oil, 4 garlic cloves minced, 1 tsp ginger'],
    steps: ['Pat chicken completely dry — essential for crispiness', 'Mix potato starch, flour, salt, pepper. Coat chicken pieces evenly', 'Let coated chicken rest 15 min to dry slightly', 'Heat oil to 160°C. First fry 8-10 min until pale golden. Drain', 'Rest fried chicken 5 min on rack', 'Increase oil to 190°C. Second fry 4-5 min until deeply golden and crackling', 'Combine all yangnyeom sauce ingredients in pan, simmer 3 min until glossy', 'Immediately toss hot chicken in sauce to coat', 'Serve topped with sesame seeds and sliced scallions'],
    tip: 'The double-fry method is non-negotiable. The first fry cooks the chicken through; the second fry at high heat creates the impossibly thin, crackling crust. Potato starch (not cornstarch) gives the signature Korean glass-like texture.'
  },
  {
    id: 'bulgogi', name: 'Bulgogi (Korean BBQ Beef)', cuisine: 'korean', stars: 5,
    cookStyle: 'grilled', difficulty: 'Easy', time: '30 min + 2hr marinate', serves: 4, calories: 390,
    emoji: '🥩', color: 'linear-gradient(135deg, #1D4ED8, #7C3AED)',
    photo: 'https://images.unsplash.com/photo-1583631060487-d05a3efb65cb?w=600&q=80',
    tags: ['beef', 'bbq', 'marinated', 'sweet', 'smoky', 'korean'],
    description: 'Thin-sliced beef marinated in a sweet-savory sauce of soy, pear, and sesame — the most beloved Korean BBQ dish, cooked at the table or in a hot pan.',
    ingredients: ['600g beef rib-eye or sirloin, thinly sliced (freeze 30 min first for easier slicing)', '1 Asian pear (or apple), grated', '5 tbsp soy sauce', '3 tbsp sugar', '2 tbsp sesame oil', '6 garlic cloves, minced', '1 tsp ginger, grated', '3 green onions, sliced', '1 tbsp sesame seeds', '1 onion, thinly sliced', 'Freshly ground black pepper'],
    steps: ['Grate Asian pear — enzymes in pear tenderize the beef naturally', 'Mix pear, soy sauce, sugar, sesame oil, garlic, ginger into marinade', 'Add beef slices and onion to marinade, mix thoroughly', 'Marinate minimum 2 hours, ideally overnight', 'Heat cast-iron pan or grill to highest heat', 'Cook beef in single layers, 1-2 min each side — don\'t crowd the pan', 'Caramelization is key: let edges char slightly for the signature smoky-sweet flavor', 'Serve immediately with steamed rice, lettuce wraps, and banchan side dishes'],
    tip: 'The grated Asian pear is the secret — its natural enzymes (actinidin) break down the beef proteins for extraordinary tenderness. If unavailable, use kiwi or apple. Slice beef paper-thin (3mm) for the best texture.'
  },
  {
    id: 'tteokbokki', name: 'Tteokbokki (Spicy Rice Cakes)', cuisine: 'korean', stars: 4,
    cookStyle: 'quick', difficulty: 'Easy', time: '25 min', serves: 3, calories: 380,
    emoji: '🌶️', color: 'linear-gradient(135deg, #EF4444, #DC2626)',
    photo: 'https://images.unsplash.com/photo-1591814453440-e04f9f2b3e84?w=600&q=80',
    tags: ['rice-cakes', 'spicy', 'street-food', 'vegan', 'comfort', 'korean'],
    description: 'Korea\'s #1 street food — chewy cylindrical rice cakes bathed in a fiery, sweet-savory gochujang sauce. Addictively good, ready in 25 minutes.',
    ingredients: ['500g cylindrical rice cakes (tteok)', '200g fish cakes (or extra vegetables for vegan)', '2 cups anchovy broth (or water)', '3 tbsp gochujang', '1 tbsp gochugaru (Korean chili flakes)', '2 tbsp soy sauce', '1 tbsp sugar', '1 tsp sesame oil', '3 green onions, cut into 2-inch pieces', '2 boiled eggs (optional)', 'Sesame seeds to serve'],
    steps: ['Make broth: simmer dried anchovies and kelp 10 min, strain (or use plain water)', 'Bring broth to boil. Add gochujang, gochugaru, soy sauce, sugar — stir to combine', 'Add rice cakes, simmer 8-10 min stirring frequently until sauce thickens', 'Add fish cakes and green onions, cook 3 more min', 'Sauce should coat everything in a glossy, thick layer', 'Add sesame oil, toss. Top with sesame seeds and halved boiled eggs', 'Serve immediately while still bubbling'],
    tip: 'Don\'t stop stirring — the rice cakes stick to the bottom. The sauce is ready when it coats the back of a spoon thickly and the rice cakes are soft but still springy. Overcooking makes them mushy.'
  },
  // ── BAKERY ──
  {
    id: 'croissant', name: 'Butter Croissants', cuisine: 'bakery', stars: 5,
    cookStyle: 'baked', difficulty: 'Hard', time: '24 hours', serves: 12, calories: 310,
    emoji: '🥐', color: 'linear-gradient(135deg, #F59E0B, #D97706)',
    photo: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
    tags: ['pastry', 'laminated', 'french', 'breakfast'],
    description: 'The gold standard of French pastry — shatteringly crispy, deeply buttery, and impossibly flaky with 27 perfect layers.',
    ingredients: ['500g bread flour', '10g salt', '80g sugar', '7g instant yeast', '300ml cold milk', '30g softened butter', 'For lamination: 250g cold European-style butter (84% fat)'],
    steps: ['Mix flour, salt, sugar, yeast. Add cold milk & 30g butter. Knead 8 min. Rest fridge 1 hour', 'Beat 250g butter into 6x6 inch square, chill', 'Roll dough to 8x6 inches, enclose butter block', 'Roll to 60x20cm rectangle, fold into thirds (letter fold). Chill 30 min', 'Repeat rolling and folding 2 more times, resting 30 min each time', 'Roll final dough to 4mm thick, cut triangles', 'Roll triangles from base to tip, curve ends', 'Proof 2-3 hours until doubled and wobbly. Brush with egg wash', 'Bake 200°C for 18-20 min until deep golden'],
    tip: 'Temperature control is everything. Butter should be pliable but not soft (cold room). If dough feels warm or butter squirts out, chill immediately.'
  },
  {
    id: 'sourdough', name: 'Artisan Sourdough', cuisine: 'bakery', stars: 5,
    cookStyle: 'baked', difficulty: 'Hard', time: '72 hours', serves: 1, calories: 120,
    emoji: '🍞', color: 'linear-gradient(135deg, #92400E, #D97706)',
    photo: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=600&q=80',
    tags: ['bread', 'fermented', 'sourdough', 'artisan'],
    description: 'The ultimate artisan sourdough with an open, irregular crumb, blistered crust and complex tangy flavor from 72-hour cold fermentation.',
    ingredients: ['450g bread flour (12.5% protein)', '50g whole wheat flour', '375g filtered water (75% hydration)', '100g active sourdough starter (100% hydration)', '10g fine sea salt'],
    steps: ['Mix flour and 325g water, autolyse 1 hour', 'Add starter, mix. Rest 30 min', 'Add salt dissolved in remaining water. Stretch and fold', 'Perform 4 sets of stretch & folds over 2 hours', 'Bulk ferment at 78°F until 75% volume increase (4-6 hours)', 'Pre-shape into round, rest 30 min', 'Final shape, place in floured banneton', 'Cold proof in fridge 12-16 hours', 'Bake in Dutch oven: 500°F covered 20 min, uncover 20 more min'],
    tip: 'Your starter must be at peak activity — it should double within 4-6 hours and smell pleasantly sour. Use the float test: a spoonful should float in water.'
  },
  {
    id: 'macarons', name: 'French Macarons', cuisine: 'bakery', stars: 5,
    cookStyle: 'baked', difficulty: 'Hard', time: '4 hours', serves: 24, calories: 85,
    emoji: '🎂', color: 'linear-gradient(135deg, #EC4899, #F43F5E)',
    photo: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&q=80',
    tags: ['pastry', 'french', 'delicate', 'colorful'],
    description: 'The most elegant of French confections — delicate almond meringue shells with a smooth, creamy filling.',
    ingredients: ['150g blanched almond flour', '150g powdered sugar', '110g aged egg whites (divided)', '150g granulated sugar', '50ml water', 'Food coloring', 'For filling: 200g buttercream or ganache'],
    steps: ['Sift almond flour and powdered sugar together, discard lumps', 'Make Italian meringue: boil sugar & water to 118°C, stream into whipping whites', 'Fold half the meringue into almond paste to loosen', 'Add remaining meringue, macaronage until batter flows like lava', 'Pipe 1.5-inch circles on parchment, tap to release air', 'Rest until dry to touch (30-60 min depending on humidity)', 'Bake 150°C for 13-15 min. Cool completely', 'Sandwich with filling, mature in fridge 24 hours before serving'],
    tip: 'The macaronage (folding) stage is critical — the batter should "flow like lava" and a ribbon dropped back should disappear in 30 seconds. Over-mixing = flat macarons.'
  },
  {
    id: 'creme-brulee', name: 'Crème Brûlée', cuisine: 'bakery', stars: 5,
    cookStyle: 'baked', difficulty: 'Medium', time: '3 hours', serves: 6, calories: 380,
    emoji: '🍮', color: 'linear-gradient(135deg, #FCD34D, #F59E0B)',
    photo: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80',
    tags: ['dessert', 'french', 'custard', 'luxury'],
    description: 'Silky vanilla custard beneath a perfectly shattered caramel crust. The sound when you crack it is pure satisfaction.',
    ingredients: ['500ml heavy cream (35% fat)', '1 vanilla bean, split', '6 egg yolks', '120g caster sugar', '50g sugar for brûlée top'],
    steps: ['Heat cream with vanilla bean until steaming, steep 20 min', 'Whisk yolks and sugar until pale yellow', 'Temper cream into yolks slowly while whisking', 'Strain through fine sieve', 'Pour into 6 ramekins in water bath', 'Bake 160°C for 35-40 min — center should wobble like jello', 'Cool to room temperature, then refrigerate minimum 4 hours', 'Sprinkle sugar, brûlée with torch in circular motion until amber'],
    tip: 'The custard is ready when the edge is set but the center has a definite wobble. Over-baked custard becomes grainy. Better under-baked than over-baked!'
  },
  // ── LUXURY ──
  {
    id: 'beef-wellington', name: 'Beef Wellington', cuisine: 'luxury', stars: 5,
    cookStyle: 'baked', difficulty: 'Hard', time: '3 hours', serves: 6, calories: 680,
    emoji: '🥩', color: 'linear-gradient(135deg, #1E1E3E, #4C1D95)',
    photo: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80',
    tags: ['beef', '5-star', 'pastry', 'impressive'],
    description: 'The ultimate showstopper — beef tenderloin wrapped in mushroom duxelles and golden puff pastry. Pure luxury on a plate.',
    ingredients: ['1kg center-cut beef tenderloin', '500g mushrooms (mixed)', '200g prosciutto slices', '500g puff pastry', '2 egg yolks for wash', '2 tbsp Dijon mustard', '2 shallots', '4 garlic cloves', 'Fresh thyme', 'Salt & black pepper'],
    steps: ['Season beef generously, sear all sides until caramelized. Brush with mustard, chill', 'Make duxelles: blitz mushrooms, sauté with shallots, garlic, thyme until all moisture evaporates (30 min)', 'Lay plastic wrap, overlap prosciutto into rectangle, spread duxelles', 'Place beef at edge, roll tightly into a log, chill 30 min', 'Roll pastry, place wellington at edge, wrap tightly, chill 15 min', 'Score pastry decoratively, brush with egg wash', 'Bake 220°C for 25-30 min (core temp 52°C for medium-rare)', 'Rest 10 min before slicing with sharp knife'],
    tip: 'The mushroom duxelles MUST be completely dry — any moisture will make the pastry soggy. Cook until it looks like paste. Chilling at each stage is crucial.'
  },
  {
    id: 'lobster-thermidor', name: 'Lobster Thermidor', cuisine: 'luxury', stars: 5,
    cookStyle: 'baked', difficulty: 'Hard', time: '60 min', serves: 2, calories: 580,
    emoji: '🦞', color: 'linear-gradient(135deg, #DC2626, #7C3AED)',
    photo: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600&q=80',
    tags: ['lobster', 'french', '5-star', 'seafood'],
    description: 'Classic French luxury — lobster in a rich cognac cream sauce, gratinéed under the broiler until golden and bubbling.',
    ingredients: ['2 live lobsters (600g each)', '100ml cognac', '200ml heavy cream', '100ml dry white wine', '2 shallots', '2 tbsp Dijon mustard', '100g Gruyère cheese, grated', '30g butter', 'Fresh tarragon, chervil', 'Salt & cayenne pepper'],
    steps: ['Split live lobsters, brush with butter, roast 15 min at 200°C', 'Remove lobster meat, roughly chop, set shells aside', 'Sauté shallots in butter, add cognac & flambé', 'Add white wine, reduce by half', 'Add cream, reduce to sauce consistency', 'Add mustard, herbs, season with cayenne', 'Fold in lobster meat', 'Spoon mixture back into shells, top with Gruyère', 'Broil under high heat until golden and bubbling'],
    tip: 'The flambé adds a caramelized depth you cannot replicate — have a lid ready to extinguish if needed. Use fresh live lobster only for this dish; frozen will not do it justice.'
  },
  {
    id: 'truffle-risotto', name: 'Truffle Risotto', cuisine: 'luxury', stars: 5,
    cookStyle: 'one-pan', difficulty: 'Medium', time: '45 min', serves: 4, calories: 520,
    emoji: '🍄', color: 'linear-gradient(135deg, #3B0764, #6D28D9)',
    photo: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80',
    tags: ['risotto', 'truffle', 'italian', 'luxury'],
    description: 'Perfectly wave-like (all\'onda) risotto with earthy truffle, aged Parmigiano-Reggiano and a generous hand with butter.',
    ingredients: ['350g Carnaroli or Arborio rice', '1.5L warm chicken or mushroom stock', '150g Parmigiano-Reggiano, grated', '80g cold unsalted butter, cubed', '1 white onion, finely minced', '150ml dry white wine', '20g dried porcini mushrooms', 'Black truffle (fresh or preserved)', 'Truffle oil to finish', 'Salt & white pepper'],
    steps: ['Soak porcini in 250ml hot water 20 min, reserve soaking liquid', 'Warm stock with porcini liquid in separate pot', 'Sauté onion in butter until soft and translucent', 'Add rice, toast 2 min until edges translucent', 'Add wine, stir until absorbed', 'Add stock one ladle at a time, stirring constantly', 'After 16-18 min, rice should be al dente', 'Remove from heat, add cold butter and Parmesan (mantecatura)', 'Stir vigorously until creamy. Rest 2 min', 'Serve flat in warm bowls, shave truffle generously'],
    tip: 'Carnaroli rice is superior to Arborio for risotto — it holds its shape better. The mantecatura (beating in cold butter off heat) is what creates that restaurant-quality creaminess.'
  },
  {
    id: 'duck-confit', name: 'Duck Confit', cuisine: 'luxury', stars: 5,
    cookStyle: 'slow-cooked', difficulty: 'Hard', time: '26 hours', serves: 4, calories: 720,
    emoji: '🦆', color: 'linear-gradient(135deg, #451A03, #92400E)',
    photo: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80',
    tags: ['duck', 'french', 'slow-cook', 'luxury'],
    description: 'Duck legs cured in herbs, then submerged in their own fat and slow-cooked to sublime, fall-off-the-bone perfection.',
    ingredients: ['4 duck legs', '40g sea salt', '2 tsp black pepper', '4 garlic cloves, crushed', 'Fresh thyme & bay leaves', '1kg duck fat (or enough to cover)', 'For serving: green lentils, bitter greens or pomme sarladaises'],
    steps: ['Rub duck legs with salt, pepper, garlic & herbs. Refrigerate 24 hours', 'Rinse and pat dry thoroughly', 'Heat duck fat in deep oven-proof pot to 90°C', 'Submerge duck legs in fat completely', 'Cook in 90°C oven for 8-10 hours until very tender', 'Cool in fat (keeps up to 2 weeks in fridge)', 'To serve: remove from fat, wipe off excess', 'Place skin-side down in cold pan, heat slowly until skin crisps', 'Finish in 220°C oven 10 min for shatteringly crisp skin'],
    tip: 'Never rush confit — the low, slow process breaks down collagen into gelatin. The fat is not absorbed; it is a cooking medium. The preserved duck will improve in flavor over days.'
  },

  // ── INDIAN (extra) ──
  {
    id: 'chicken-tikka-masala', name: 'Chicken Tikka Masala', cuisine: 'indian', stars: 5,
    cookStyle: 'one-pan', difficulty: 'Medium', time: '50 min', serves: 4, calories: 460,
    emoji: '🍗', color: 'linear-gradient(135deg, #DC2626, #F97316)',
    photo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
    tags: ['chicken', 'curry', 'creamy', 'popular', 'restaurant-style'],
    description: 'Charred tikka chicken pieces swimming in a velvety spiced tomato-cream masala. The world\'s most ordered curry — now perfected at home.',
    ingredients: ['700g chicken breast, cubed', '150g yogurt', '2 tbsp tandoori masala', '400g crushed tomatoes', '150ml heavy cream', '2 onions, diced', '1 tbsp ginger-garlic paste', '1 tsp cumin', '1 tsp coriander', '1 tsp paprika', '½ tsp fenugreek leaves', '2 tbsp butter', 'Salt, coriander to garnish'],
    steps: ['Marinate chicken in yogurt and tandoori masala for 1 hour minimum', 'Grill or broil chicken until charred edges appear, set aside', 'Melt butter, sauté onions until golden brown (10 min)', 'Add ginger-garlic paste, cook 2 min', 'Add all dry spices, toast 1 min', 'Add tomatoes, cook until oil separates (12 min)', 'Blend sauce smooth, return to pan', 'Add cream and fenugreek leaves, simmer 8 min', 'Add grilled chicken, simmer 5 min and serve'],
    tip: 'The char on the chicken is not optional — it creates the smoky complexity that separates tikka masala from a basic curry. Get the grill or broiler screaming hot.'
  },
  {
    id: 'rogan-josh', name: 'Lamb Rogan Josh', cuisine: 'indian', stars: 5,
    cookStyle: 'slow-cooked', difficulty: 'Medium', time: '2 hours', serves: 4, calories: 520,
    emoji: '🍖', color: 'linear-gradient(135deg, #991B1B, #DC2626)',
    photo: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80',
    tags: ['lamb', 'curry', 'kashmiri', 'slow-cook', 'aromatic'],
    description: 'Kashmir\'s crown jewel — fall-apart lamb in a deep ruby sauce of Kashmiri chilies, whole spices and slow-cooked perfection.',
    ingredients: ['1kg bone-in lamb shoulder, cut into pieces', '4 tbsp Kashmiri chili powder (for color, not heat)', '200g yogurt, whisked', '3 onions, thinly sliced', '4 tbsp ghee', 'Whole spices: 4 cardamom, 3 cloves, 2 bay leaves, 1 cinnamon stick', '1 tbsp fennel powder', '1 tsp dry ginger powder', '1 tsp turmeric', 'Salt to taste', 'Fresh coriander'],
    steps: ['Heat ghee, fry whole spices until fragrant, add onions and cook until deep golden (20 min)', 'Add lamb, sear on all sides until browned', 'Mix Kashmiri chili, turmeric in water to make paste, add to lamb', 'Add fennel and ginger powder, stir well', 'Add whisked yogurt one spoon at a time, stirring to prevent curdling', 'Add 1 cup water, bring to boil', 'Cover and simmer on very low heat for 1.5 hours until lamb is tender', 'Adjust salt, garnish with coriander and serve with naan'],
    tip: 'Kashmiri chili gives the signature vivid red color without excessive heat. The secret is cooking yogurt in carefully — add it slowly while stirring constantly to prevent splitting.'
  },
  {
    id: 'samosa', name: 'Crispy Samosas', cuisine: 'indian', stars: 5,
    cookStyle: 'deep-fried', difficulty: 'Medium', time: '60 min', serves: 12, calories: 180,
    emoji: '🔺', color: 'linear-gradient(135deg, #D97706, #F59E0B)',
    photo: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
    tags: ['snack', 'vegetarian', 'pastry', 'street-food', 'fried'],
    description: 'India\'s most beloved street snack — crispy golden pastry filled with spiced potatoes and peas. Shatteringly crunchy outside, fluffy and aromatic inside.',
    ingredients: ['For pastry: 250g all-purpose flour, 4 tbsp oil, ½ tsp ajwain (carom seeds), salt, water', 'For filling: 4 large potatoes boiled and mashed, 150g peas, 1 tbsp oil, 1 tsp cumin seeds, 1 tsp coriander powder, ½ tsp garam masala, ½ tsp amchur (dry mango powder), 2 green chilies minced, fresh coriander, salt', 'Oil for deep frying'],
    steps: ['Mix flour, oil, ajwain and salt. Add water gradually to form stiff dough, rest 20 min', 'Prepare filling: fry cumin in oil, add all spices, add potato and peas, mix well, cool', 'Divide dough into balls, roll each into oval, cut in half', 'Shape each half-circle into cone, fill with potato mixture, seal edges with water', 'Heat oil to 160°C — low heat is key for crispiness', 'Fry samosas 12-15 min, turning occasionally, until golden and crisp', 'Drain and serve with mint chutney and tamarind chutney'],
    tip: 'Frying at lower temperature (160°C not 180°C) is the secret to truly crispy samosas. Hot oil puffs the outside before the inside cooks. Seal edges very firmly to avoid oil seeping in.'
  },
  {
    id: 'aloo-gobi', name: 'Aloo Gobi', cuisine: 'indian', stars: 4,
    cookStyle: 'one-pan', difficulty: 'Easy', time: '30 min', serves: 4, calories: 220,
    emoji: '🥔', color: 'linear-gradient(135deg, #D97706, #65A30D)',
    photo: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
    tags: ['vegetarian', 'vegan', 'potato', 'cauliflower', 'dry-curry', 'healthy'],
    description: 'The humble dry curry that proves simple ingredients create magic — golden potatoes and cauliflower kissed with turmeric, cumin and ginger. Vegan perfection.',
    ingredients: ['400g potatoes, cubed', '1 medium cauliflower, cut into florets', '3 tbsp oil', '1 tsp cumin seeds', '1 onion, diced', '1 tbsp ginger-garlic paste', '2 tomatoes, chopped', '1 tsp turmeric', '1 tsp coriander powder', '1 tsp cumin powder', '½ tsp garam masala', '1 tsp chili powder', 'Salt, fresh coriander'],
    steps: ['Heat oil, fry cumin seeds until they pop', 'Add onion and cook until translucent', 'Add ginger-garlic paste, cook 2 min', 'Add tomatoes and all dry spices, cook until mushy', 'Add potatoes, coat in spices, cook covered 8 min', 'Add cauliflower, mix gently to coat', 'Cook covered on medium-low, stirring occasionally, 15 min', 'Uncover last 5 min to dry out and slightly brown the vegetables', 'Finish with garam masala and fresh coriander'],
    tip: 'Do not add water — this is a dry curry. Low heat and the vegetables\' own steam does the cooking. Opening too often releases steam and makes it watery.'
  },

  // ── CHINESE (extra) ──
  {
    id: 'char-siu', name: 'Char Siu (BBQ Pork)', cuisine: 'chinese', stars: 5,
    cookStyle: 'grilled', difficulty: 'Easy', time: '45 min + marinate', serves: 4, calories: 440,
    emoji: '🥩', color: 'linear-gradient(135deg, #C1292E, #D97706)',
    photo: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=600&q=80',
    tags: ['pork', 'bbq', 'cantonese', 'sweet', 'smoky'],
    description: 'Cantonese lacquered BBQ pork with a gloriously sticky, caramelized char — the most aromatic street food aroma in Hong Kong.',
    ingredients: ['800g pork shoulder or neck, cut into strips', '3 tbsp hoisin sauce', '3 tbsp honey', '2 tbsp soy sauce', '1 tbsp oyster sauce', '1 tbsp Shaoxing wine', '1 tbsp sugar', '1 tsp five-spice powder', '3 garlic cloves, minced', 'Red food coloring (optional, traditional)', 'Extra honey for glazing'],
    steps: ['Combine all marinade ingredients, mix well', 'Coat pork strips thoroughly, marinate 4 hours minimum or overnight', 'Bring to room temperature before cooking', 'Preheat oven to 220°C, place pork on wire rack over foil-lined tray', 'Roast 15 min, turn strips', 'Brush generously with honey glaze, roast 10 more min', 'Brush again with honey, switch to broil/grill 3-5 min until edges char', 'Rest 5 min before slicing, drizzle with pan juices'],
    tip: 'The char (slight burning at edges) is the point — it creates bittersweet complexity against the sweet glaze. Use neck or shoulder, never lean loin; fat keeps it juicy through high heat.'
  },
  {
    id: 'beef-chow-mein', name: 'Beef Chow Mein', cuisine: 'chinese', stars: 5,
    cookStyle: 'stir-fry', difficulty: 'Easy', time: '20 min', serves: 3, calories: 480,
    emoji: '🍜', color: 'linear-gradient(135deg, #1E3A5F, #0891B2)',
    photo: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80',
    tags: ['noodles', 'beef', 'stir-fry', 'takeout', 'quick'],
    description: 'Crispy-edged egg noodles with velvety beef and vegetables in a savory oyster sauce glaze — the takeout classic made infinitely better at home.',
    ingredients: ['300g fresh egg noodles', '300g beef sirloin, thinly sliced', '1 onion, sliced', '2 stalks celery, sliced diagonally', '200g bean sprouts', '3 scallions', '4 tbsp oyster sauce', '2 tbsp soy sauce', '1 tbsp dark soy sauce', '1 tsp sesame oil', '2 tsp cornstarch', '1 tbsp Shaoxing wine', '½ tsp sugar', 'High smoke-point oil'],
    steps: ['Marinate beef with soy sauce, cornstarch, Shaoxing wine, sesame oil for 15 min', 'Blanch noodles 2 min, drain, toss with a little oil to prevent sticking', 'Heat wok until smoking. Spread noodles, do not stir — let bottom crisp 2 min', 'Flip noodle cake, crisp other side, remove', 'In same hot wok, flash-fry beef until 80% cooked, remove', 'Stir-fry onion and celery 2 min on high heat', 'Return noodles and beef, add oyster sauce, dark soy, sugar', 'Toss everything furiously on maximum heat', 'Add bean sprouts and scallions, toss 30 sec, serve immediately'],
    tip: 'Wok hei — the breath of the wok — requires superhot heat and speed. Do not crowd the pan. Flash-frying beef separately then combining is the restaurant secret.'
  },
  {
    id: 'sweet-sour-pork', name: 'Sweet & Sour Pork', cuisine: 'chinese', stars: 5,
    cookStyle: 'deep-fried', difficulty: 'Medium', time: '35 min', serves: 4, calories: 510,
    emoji: '🍍', color: 'linear-gradient(135deg, #F59E0B, #EF4444)',
    photo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80',
    tags: ['pork', 'sweet-sour', 'crispy', 'cantonese', 'pineapple'],
    description: 'Cantonese restaurant classic — crispy pork in a vibrant sweet and sour sauce with pineapple, peppers and a glossy glaze that clings to every piece.',
    ingredients: ['500g pork shoulder, 3cm cubes', 'For batter: 4 tbsp cornstarch, 2 tbsp flour, 1 egg, pinch of salt', 'For sauce: 4 tbsp ketchup, 3 tbsp rice vinegar, 3 tbsp sugar, 2 tbsp pineapple juice, 1 tbsp soy sauce, 1 tsp cornstarch', '1 red bell pepper, chunked', '1 green bell pepper, chunked', '1 onion, chunked', '150g pineapple chunks', 'Oil for deep frying'],
    steps: ['Mix batter ingredients to smooth paste, coat pork pieces', 'Deep fry at 170°C for 6-8 min until pale gold, drain', 'Increase oil to 190°C, fry again 2 min until deep golden and crispy, drain', 'Mix all sauce ingredients', 'Stir-fry peppers and onion in 2 tbsp oil on high heat, 2 min', 'Add pineapple, toss', 'Pour sauce into pan, bring to boil, stir until glossy', 'Add crispy pork, toss immediately to coat', 'Serve at once — do not wait or the crust will soften'],
    tip: 'Double frying gives lasting crispiness. Add the sauce immediately before serving — never sit sauced pork or the crust goes soggy. The starch in the batter creates the signature crunchy shell.'
  },
  {
    id: 'xiao-long-bao', name: 'Xiao Long Bao (Soup Dumplings)', cuisine: 'chinese', stars: 5,
    cookStyle: 'steamed', difficulty: 'Hard', time: '3 hours', serves: 6, calories: 260,
    emoji: '🥟', color: 'linear-gradient(135deg, #F87171, #FCA5A5)',
    photo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80',
    tags: ['dumplings', 'soup', 'steamed', 'pork', 'shanghai', 'luxury'],
    description: 'Shanghai\'s most magical dumpling — a paper-thin wrapper concealing a pork filling and an entire mouthful of rich, gelatinous soup that melts inside.',
    ingredients: ['For soup jelly: 500g pork skin or trotters, 1L water, ginger, scallion (cook 3 hours, strain, refrigerate overnight)', 'For dough: 200g all-purpose flour, 90ml boiling water, 10ml cold water', 'For filling: 300g ground pork, 200g soup jelly (diced small), 2 tbsp soy sauce, 1 tbsp ginger juice, 1 tsp sesame oil, 1 tsp sugar, scallions'],
    steps: ['Make soup jelly a day ahead: boil pork skin with aromatics 3 hours, strain, chill until set, dice', 'Mix filling with all seasonings, fold in diced soup jelly gently', 'Make dough with boiling then cold water, rest 30 min covered', 'Roll thin (1mm), cut circles with 8cm cutter', 'Pleating: place filling in center, create 18+ folds to seal top', 'Steam over high heat on parchment paper 8 minutes exactly', 'Serve immediately with black vinegar and ginger julienne'],
    tip: 'The soup jelly MUST be solid cold before mixing into filling. Bite a small hole in the side first, sip the soup, then eat the dumpling. Burning your mouth is not part of the experience.'
  },

  // ── THAI (extra) ──
  {
    id: 'massaman-curry', name: 'Massaman Curry', cuisine: 'thai', stars: 5,
    cookStyle: 'slow-cooked', difficulty: 'Medium', time: '90 min', serves: 4, calories: 560,
    emoji: '🍛', color: 'linear-gradient(135deg, #92400E, #D97706)',
    photo: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&q=80',
    tags: ['curry', 'beef', 'coconut', 'peanuts', 'slow-cook', 'mild'],
    description: 'Thailand\'s richest curry — slow-braised beef with potatoes, peanuts and coconut milk infused with Persian-influenced spices. Voted world\'s best dish.',
    ingredients: ['600g beef chuck, large cubes', '400ml coconut milk', '3 tbsp massaman curry paste', '200g baby potatoes', '100g roasted peanuts', '1 onion, quartered', '2 tbsp fish sauce', '2 tbsp palm sugar', '2 tbsp tamarind paste', '3 cardamom pods', '1 cinnamon stick', '2 bay leaves', 'Steamed jasmine rice to serve'],
    steps: ['Fry massaman paste in thick coconut cream 3-4 min until fragrant', 'Add beef chunks, coat in paste, sear briefly', 'Add remaining coconut milk plus 200ml water', 'Add whole spices: cardamom, cinnamon, bay leaves', 'Bring to gentle simmer, cook covered 1 hour', 'Add potatoes, onion and peanuts', 'Season with fish sauce, palm sugar and tamarind', 'Simmer uncovered 30 more min until sauce thickens and beef is tender', 'Serve over jasmine rice'],
    tip: 'This curry genuinely improves the next day as flavors meld. The balance of sweet (palm sugar), sour (tamarind), salty (fish sauce) and rich (coconut) is what makes Massaman uniquely complex among Thai curries.'
  },
  {
    id: 'mango-sticky-rice', name: 'Mango Sticky Rice', cuisine: 'thai', stars: 5,
    cookStyle: 'steamed', difficulty: 'Easy', time: '40 min', serves: 4, calories: 420,
    emoji: '🥭', color: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
    photo: 'https://images.unsplash.com/photo-1582157631087-ec50cf3fd3cc?w=600&q=80',
    tags: ['dessert', 'mango', 'rice', 'coconut', 'sweet', 'vegan'],
    description: 'Thailand\'s most iconic dessert — luscious glutinous rice soaked in sweet coconut cream alongside silky ripe mango. Perfection in simplicity.',
    ingredients: ['300g glutinous (sticky) rice, soaked 4 hours', '400ml coconut milk', '4 tbsp sugar', '1 tsp salt', '2 ripe mangoes, sliced', 'For topping sauce: 100ml coconut milk, 1 tbsp sugar, pinch of salt, 1 tsp cornstarch', 'Sesame seeds or mung beans to garnish'],
    steps: ['Steam soaked sticky rice in bamboo steamer or muslin-lined steamer 20-25 min', 'While rice cooks, heat coconut milk with sugar and salt — do not boil, just dissolve', 'Transfer hot rice to bowl, pour warm coconut mixture over, mix gently', 'Cover and rest 20 min — rice absorbs the coconut milk completely', 'Make topping sauce: heat coconut milk, sugar, salt, thicken with cornstarch, cool', 'Peel and slice mangoes', 'Plate rice, arrange mango alongside, drizzle topping sauce over rice', 'Garnish with sesame seeds'],
    tip: 'The resting step is the secret. Glutinous rice absorbs the coconut milk as it cools, creating the sticky, coconut-infused texture. Only use ripe Ataulfo or Nam Dok Mai mangoes for this — they make or break the dish.'
  },
  {
    id: 'som-tam', name: 'Som Tam (Green Papaya Salad)', cuisine: 'thai', stars: 5,
    cookStyle: 'no-cook', difficulty: 'Easy', time: '15 min', serves: 2, calories: 140,
    emoji: '🥗', color: 'linear-gradient(135deg, #16A34A, #F97316)',
    photo: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80',
    tags: ['salad', 'papaya', 'spicy', 'fresh', 'vegan', 'low-calorie'],
    description: 'Thailand\'s explosive flavor bomb — shredded green papaya pounded with chilies, lime, fish sauce and palm sugar. Crunchy, spicy, sour and addictive.',
    ingredients: ['1 medium green papaya, peeled and shredded (julienne)', '10 bird\'s eye chilies (adjust to heat tolerance)', '3 garlic cloves', '2 tbsp palm sugar', '3 tbsp fish sauce (or soy sauce for vegan)', '3 tbsp lime juice', '100g cherry tomatoes, halved', '50g dried shrimp (optional)', '50g long beans, cut in 2cm pieces', 'Roasted peanuts to finish'],
    steps: ['In a mortar, pound chilies and garlic to rough paste', 'Add palm sugar, pound to incorporate', 'Add long beans, bruise gently, not crush', 'Add dried shrimp, bruise', 'Add shredded papaya in batches, pound and turn with spoon simultaneously', 'Add tomatoes, pound gently just to release juice', 'Season with fish sauce and lime juice — taste for balance: spicy, sour, salty, sweet', 'Transfer to plate, top with roasted peanuts', 'Serve immediately with sticky rice'],
    tip: 'The pound-and-toss motion is the technique — you pound to bruise and release flavor while a spoon mixes. Adjust the four flavors to your preference: more lime (sour), palm sugar (sweet), fish sauce (salty), or chilies (heat).'
  },

  // ── VIETNAMESE (extra) ──
  {
    id: 'fresh-spring-rolls', name: 'Gỏi Cuốn (Fresh Spring Rolls)', cuisine: 'vietnamese', stars: 5,
    cookStyle: 'no-cook', difficulty: 'Easy', time: '30 min', serves: 4, calories: 180,
    emoji: '🫙', color: 'linear-gradient(135deg, #10B981, #3B82F6)',
    photo: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80',
    tags: ['fresh', 'shrimp', 'low-calorie', 'gluten-free', 'healthy', 'summer-rolls'],
    description: 'Crystal-clear rice paper rolls stuffed with shrimp, vermicelli, herbs and crunchy vegetables. Vietnam\'s freshest, lightest dish — the antidote to heavy food.',
    ingredients: ['12 rice paper rounds (22cm)', '200g cooked shrimp, halved lengthwise', '150g rice vermicelli, cooked and cooled', '1 head butter lettuce', 'Fresh mint, Thai basil, coriander', '1 cucumber, julienned', '1 carrot, julienned', '100g bean sprouts', 'For peanut dipping sauce: 4 tbsp hoisin sauce, 2 tbsp peanut butter, 2 tbsp lime juice, 1 tbsp sriracha, water to thin'],
    steps: ['Prepare all fillings first, arrange in separate bowls for easy assembly', 'Make peanut sauce: whisk all ingredients, thin with water to dipping consistency', 'Fill a wide shallow bowl with warm water', 'Dip one rice paper 5-10 seconds until just pliable (not fully soft)', 'Lay flat on clean damp surface', 'Place 3 shrimp halves (pink side down) in center-lower third', 'Add lettuce, vermicelli, herbs, vegetables on top', 'Fold bottom up, fold sides in, roll tightly upward', 'Serve immediately with peanut dipping sauce'],
    tip: 'Do not over-soak the rice paper — it continues softening after removal. Work quickly and keep finished rolls covered with a damp cloth so they don\'t stick together. Best eaten within 30 minutes.'
  },
  {
    id: 'bun-bo-hue', name: 'Bún Bò Huế (Spicy Beef Noodle Soup)', cuisine: 'vietnamese', stars: 5,
    cookStyle: 'slow-cooked', difficulty: 'Hard', time: '4 hours', serves: 6, calories: 460,
    emoji: '🍲', color: 'linear-gradient(135deg, #DC2626, #F97316)',
    photo: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=600&q=80',
    tags: ['soup', 'beef', 'spicy', 'noodles', 'hue', 'slow-cook'],
    description: 'Huế\'s legendary spicy lemongrass beef broth with thick round noodles — more complex and fiery than phở, adored by those who know Vietnamese regional cuisine.',
    ingredients: ['500g beef shank', '500g pork trotters, cut up', '300g thick round rice noodles (bún)', '3 stalks lemongrass, bruised', '5 shallots, charred', '1 head garlic', '4 tbsp shrimp paste (mắm ruốc)', '3 tbsp lemongrass chili paste', '2 tbsp fish sauce', '1 tbsp sugar', 'Toppings: bean sprouts, banana blossom, fresh herbs, lime, chili oil'],
    steps: ['Blanch beef and pork in boiling water 5 min, discard water, clean', 'Simmer cleaned meat with 3L water, charred shallots, garlic, lemongrass for 2.5 hours', 'Remove meat, slice when cool', 'Strain broth, return to pot', 'Dilute shrimp paste in water, add to broth', 'Add lemongrass chili paste, fish sauce, sugar — taste carefully', 'Simmer broth 20 more min', 'Cook noodles, divide into bowls with meat slices', 'Ladle boiling broth over', 'Serve with all toppings on the side'],
    tip: 'The shrimp paste (mắm ruốc) is non-negotiable and irreplaceable — it gives the distinctive fermented depth that defines authentic Bún Bò Huế. Start with less and taste — it\'s powerful.'
  },
  {
    id: 'com-tam', name: 'Cơm Tấm (Broken Rice)', cuisine: 'vietnamese', stars: 5,
    cookStyle: 'grilled', difficulty: 'Easy', time: '40 min', serves: 2, calories: 550,
    emoji: '🍚', color: 'linear-gradient(135deg, #047857, #D97706)',
    photo: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9d0?w=600&q=80',
    tags: ['rice', 'pork', 'grilled', 'street-food', 'saigon'],
    description: 'Saigon\'s soul food — broken rice with grilled lemongrass pork chop, steamed egg cake, and fish sauce dressing. The breakfast of champions across Ho Chi Minh City.',
    ingredients: ['2 cups broken jasmine rice (or regular rice)', '2 pork rib chops', 'Marinade: 2 tbsp fish sauce, 1 tbsp oyster sauce, 1 tbsp sugar, 2 stalks lemongrass minced, 3 garlic cloves, 1 shallot', 'For egg cake (chả trứng): 3 eggs, 100g glass noodles soaked, 100g ground pork, seasoning', 'Nuoc cham: 3 tbsp fish sauce, 2 tbsp sugar, 3 tbsp lime juice, 1 chili, 2 garlic cloves, water', 'Cucumber slices, tomato, spring onion oil to serve'],
    steps: ['Marinate pork chops in all marinade ingredients at least 2 hours', 'Mix egg cake ingredients: ground pork, soaked noodles, beaten eggs, seasoning', 'Steam egg cake in small bowl/tin 20 min until set', 'Cook broken rice — ratio 1:1.2 water', 'Grill pork chops on high heat 4 min each side until charred and cooked', 'Make nuoc cham: dissolve sugar in warm water, add all ingredients', 'Make spring onion oil: pour hot oil over chopped scallions', 'Plate rice, add grilled pork, sliced egg cake, cucumber', 'Drizzle generously with nuoc cham and spring onion oil'],
    tip: 'The char on the pork from the lemongrass-sugar marinade is essential. Nuoc cham should taste equally sweet, sour and salty — adjust ratios to your palate. It\'s the dressing for the entire dish.'
  },

  // ── MYANMAR (extra) ──
  {
    id: 'ohn-no-khao-swe', name: 'Ohn No Khao Swe', cuisine: 'myanmar', stars: 5,
    cookStyle: 'one-pan', difficulty: 'Medium', time: '50 min', serves: 4, calories: 520,
    emoji: '🍜', color: 'linear-gradient(135deg, #D97706, #8B5CF6)',
    photo: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
    tags: ['noodles', 'chicken', 'coconut', 'curry', 'myanmar-classic'],
    description: 'Myanmar\'s beloved coconut chicken noodle soup — golden, aromatic and deeply comforting. The bowl that Burmese people crave most when away from home.',
    ingredients: ['500g chicken thighs, bone-in', '400ml coconut milk', '500g egg noodles', '2 onions', '4 garlic cloves', '3cm ginger', '2 tbsp chickpea flour (besan)', '1 tbsp turmeric', '1 tsp chili powder', '2 tbsp fish sauce', '1 tbsp shrimp paste', 'Toppings: crispy fried noodles, sliced shallots, hard boiled eggs, lime, chili flakes, fresh coriander'],
    steps: ['Blend onions, garlic, ginger and shrimp paste into smooth paste', 'Fry paste in oil until golden and fragrant (10 min)', 'Add turmeric and chili powder, fry 1 min', 'Add chicken pieces, coat well, sear 5 min', 'Mix chickpea flour with ½ cup water, add to pan — stir well to prevent lumps', 'Add coconut milk and 400ml water, bring to gentle simmer', 'Cook 25 min until chicken is tender and broth thickens', 'Remove chicken, shred, return to pot', 'Season with fish sauce', 'Cook noodles separately, serve in bowls with broth ladled over', 'Top generously with all condiments'],
    tip: 'Chickpea flour is the traditional thickener that gives this soup its distinctive body and subtle nutty flavor. The toppings table is not optional — the fried noodles, lime and crispy shallots transform each bowl completely.'
  },
  {
    id: 'myanmar-curry', name: 'Beef Acho (Myanmar Curry)', cuisine: 'myanmar', stars: 5,
    cookStyle: 'slow-cooked', difficulty: 'Medium', time: '2 hours', serves: 4, calories: 480,
    emoji: '🍖', color: 'linear-gradient(135deg, #7C3AED, #DC2626)',
    photo: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80',
    tags: ['beef', 'curry', 'myanmar', 'slow-cook', 'aromatic'],
    description: 'Myanmar-style beef curry — simpler and oilier than Indian curry, allowing the meat and aromatics to speak clearly. Slow-cooked until the oil separates beautifully on top.',
    ingredients: ['800g beef chuck, cubed', '3 onions, diced', '6 garlic cloves', '3cm ginger', '3 tbsp tomato paste', '1 tbsp turmeric', '1 tbsp chili powder', '1 tsp paprika', '4 tbsp oil (generous)', '2 tbsp fish sauce', '1 tbsp shrimp paste', 'Lemongrass, kaffir lime leaves', 'Fresh coriander and lime to serve'],
    steps: ['Blend onions, garlic, ginger, shrimp paste into paste', 'Heat oil generously — Myanmar curries use more oil than Indian', 'Fry paste until deeply golden (15 min) until oil begins to separate', 'Add all dry spices, fry 2 min', 'Add tomato paste, cook until darkened', 'Add beef, stir to coat in paste', 'Add just enough water to cover, bring to boil', 'Simmer uncovered on medium heat 1.5 hours', 'The dish is ready when oil clearly floats on top and sauce is thick', 'Season with fish sauce, serve over rice'],
    tip: 'In Myanmar cooking, oil separating on top (a-sit in Burmese) is a sign of a properly cooked curry — not something to skim off. This is how you know the water has evaporated and spices are cooked through.'
  },
  {
    id: 'myanmar-tea-leaf-rice', name: 'Htamin Jin (Fermented Rice)', cuisine: 'myanmar', stars: 4,
    cookStyle: 'no-cook', difficulty: 'Easy', time: '20 min', serves: 2, calories: 320,
    emoji: '🌿', color: 'linear-gradient(135deg, #059669, #8B5CF6)',
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    tags: ['rice', 'fermented', 'myanmar', 'unique', 'sour', 'probiotic'],
    description: 'One of Myanmar\'s most unique dishes — slightly sour fermented rice served with a crunchy, flavor-packed topping of sesame, garlic, dried shrimp and turmeric. Humble and extraordinary.',
    ingredients: ['2 cups cooked rice (day-old preferred)', '2 tbsp tamarind paste mixed with 2 tbsp water', '1 tsp turmeric', '4 tbsp oil', '3 tbsp sesame seeds, toasted', '3 tbsp dried shrimp, pounded', '4 shallots, thinly sliced and fried crispy', '6 garlic cloves, thinly sliced and fried crispy', '2 green chilies, sliced', 'Lime juice, fish sauce, fresh coriander'],
    steps: ['Mix cooked rice with tamarind paste and turmeric until evenly yellow-orange', 'Season with fish sauce and a squeeze of lime — rice should taste slightly sour', 'In a small bowl, combine sesame seeds, pounded dried shrimp, half the fried shallots', 'Heat remaining oil, pour over sesame mixture — it will sizzle', 'Shape seasoned rice into a mound on plate', 'Top generously with the toasted sesame mixture', 'Garnish with remaining crispy shallots, crispy garlic, sliced chilies', 'Finish with fresh coriander and a squeeze of lime'],
    tip: 'Using leftover rice that has dried slightly in the fridge makes this better — the grains stay separate. The sizzled sesame-shrimp topping is the star; make extra because everyone will want more.'
  },

  // ── BAKERY (extra) ──
  {
    id: 'cinnamon-rolls', name: 'Cinnamon Rolls', cuisine: 'bakery', stars: 5,
    cookStyle: 'baked', difficulty: 'Medium', time: '3 hours', serves: 12, calories: 380,
    emoji: '🌀', color: 'linear-gradient(135deg, #92400E, #D97706)',
    photo: 'https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=600&q=80',
    tags: ['pastry', 'cinnamon', 'sweet', 'breakfast', 'american', 'baked'],
    description: 'Pillowy-soft, impossibly fluffy rolls swirled with cinnamon butter and crowned with tangy cream cheese frosting. The most indulgent morning bake.',
    ingredients: ['For dough: 500g bread flour, 7g instant yeast, 2 tsp sugar, 1 tsp salt, 300ml warm milk, 1 egg, 60g softened butter', 'For filling: 100g butter softened, 150g brown sugar, 2 tbsp cinnamon', 'For cream cheese frosting: 200g cream cheese, 100g powdered sugar, 2 tbsp butter, 1 tsp vanilla, 2 tbsp milk'],
    steps: ['Mix flour, yeast, sugar, salt. Add warm milk, egg, and softened butter', 'Knead until smooth and elastic (10 min). Place in oiled bowl, cover, rise 1 hour', 'Roll risen dough to 40x30cm rectangle', 'Spread softened butter all over dough', 'Mix cinnamon and brown sugar, sprinkle evenly over butter', 'Roll tightly from long edge into a log', 'Cut into 12 equal pieces, place in greased baking dish', 'Cover and rise 45 min until puffy', 'Bake 180°C for 22-25 min until golden', 'Cool 10 min, spread cream cheese frosting generously while still warm'],
    tip: 'Warm — not hot — milk is crucial: hot kills yeast, cold slows it. The second rise in the tin creates the signature soft, pull-apart texture. Frost while still warm so it melts into every crevice.'
  },
  {
    id: 'tiramisu', name: 'Classic Tiramisu', cuisine: 'bakery', stars: 5,
    cookStyle: 'no-cook', difficulty: 'Easy', time: '30 min + 4hr chill', serves: 8, calories: 420,
    emoji: '☕', color: 'linear-gradient(135deg, #451A03, #92400E)',
    photo: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
    tags: ['dessert', 'coffee', 'italian', 'no-bake', 'make-ahead'],
    description: 'Italy\'s most elegant dessert — coffee-soaked ladyfingers layered with mascarpone cream and dusted with cocoa. Impossibly light yet deeply rich.',
    ingredients: ['500g mascarpone cheese', '4 eggs, separated', '100g caster sugar', '300ml strong espresso, cooled', '60ml Marsala wine or coffee liqueur (optional)', '24 savoiardi (ladyfinger) biscuits', '3 tbsp cocoa powder for dusting', 'Dark chocolate for finishing (optional)'],
    steps: ['Whisk egg yolks with half the sugar until pale, thick and ribbon-like (5 min)', 'Beat in mascarpone until smooth and creamy', 'In clean bowl, whisk egg whites with remaining sugar to stiff glossy peaks', 'Gently fold egg whites into mascarpone mixture in three additions — do not deflate', 'Mix coffee with liqueur, pour into shallow dish', 'Quickly dip each ladyfinger — 2 seconds each side, not longer', 'Layer dipped biscuits in dish, spread half the cream, repeat layers', 'Refrigerate minimum 4 hours, ideally overnight', 'Dust generously with cocoa powder just before serving'],
    tip: 'Do not soak ladyfingers — a 2-second dip is enough. Over-soaked = soggy. Egg whites folded in create the airy lightness authentic tiramisu is known for. Overnight refrigeration vastly improves the texture.'
  },
  {
    id: 'chocolate-lava-cake', name: 'Chocolate Lava Cake', cuisine: 'bakery', stars: 5,
    cookStyle: 'baked', difficulty: 'Medium', time: '25 min', serves: 4, calories: 480,
    emoji: '🍫', color: 'linear-gradient(135deg, #1C0A00, #78350F)',
    photo: 'https://images.unsplash.com/photo-1600565193348-f74bd3960fce?w=600&q=80',
    tags: ['dessert', 'chocolate', 'indulgence', 'french', 'molten', 'dinner-party'],
    description: 'The ultimate dinner party showstopper — a warm dark chocolate cake with a flowing molten center that pours out like lava. Made in 25 minutes, remembered forever.',
    ingredients: ['200g dark chocolate (70%+), chopped', '150g unsalted butter, cubed', '4 eggs + 4 egg yolks', '120g caster sugar', '50g all-purpose flour', 'Pinch of salt', 'Cocoa powder for dusting ramekins', 'Vanilla ice cream and fresh berries to serve'],
    steps: ['Preheat oven to 200°C. Butter 4 ramekins, dust with cocoa powder, tap out excess', 'Melt chocolate and butter together over bain marie or microwave in 30-sec intervals — do not overheat', 'Whisk eggs, egg yolks and sugar until thick and pale (4 min)', 'Fold chocolate mixture into egg mixture', 'Sift flour and salt over, fold in until just combined', 'Fill ramekins ¾ full', 'Can refrigerate at this point up to 24 hours', 'Bake exactly 12 minutes — edges set, center still jiggles', 'Rest 1 min, run knife around edge, invert onto plate', 'Serve immediately with ice cream'],
    tip: 'The timing is everything: 12 min in a calibrated 200°C oven for ramekins at room temperature. Test with one ramekin first. The center should jiggle like set Jell-O. If in doubt — underbake rather than overbake.'
  },
  {
    id: 'pain-au-chocolat', name: 'Pain au Chocolat', cuisine: 'bakery', stars: 5,
    cookStyle: 'baked', difficulty: 'Hard', time: '24 hours', serves: 12, calories: 340,
    emoji: '🍫', color: 'linear-gradient(135deg, #1C0A00, #D97706)',
    photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80',
    tags: ['pastry', 'chocolate', 'french', 'laminated', 'breakfast'],
    description: 'The chocolate-filled cousin of the croissant — the same impossibly flaky laminated dough wrapped around dark chocolate batons. Paris in every bite.',
    ingredients: ['Same laminated dough as croissant: 500g bread flour, 7g yeast, 80g sugar, 10g salt, 300ml cold milk, 30g butter, 250g cold European butter for lamination', 'For filling: 24 dark chocolate batons (or dark chocolate bar cut into fingers)', 'Egg wash: 1 egg + 1 tbsp milk'],
    steps: ['Follow croissant dough process: mix, knead, rest, laminate with butter 3x', 'Roll final dough to 4mm thick rectangle', 'Cut into 8x12cm rectangles', 'Place one chocolate baton on short edge, roll over once, add second baton, complete rolling', 'Place seam-side down on lined baking sheet', 'Prove 2-3 hours until doubled and wobble when tray is shaken', 'Brush gently with egg wash (avoid cut edges or they won\'t puff)', 'Bake 190°C for 16-18 min until deep mahogany brown', 'Cool 10 min before eating — chocolate inside is lava-hot'],
    tip: 'Two chocolate batons create the perfect interior ratio. Use proper chocolate batons (not chips) — they melt cleanly. Dark chocolate (65%+) balances the buttery pastry best. Cool before eating is technically correct but emotionally impossible.'
  },

  // ── WESTERN ──
  {
    id: 'pasta-carbonara', name: 'Pasta Carbonara', cuisine: 'western', stars: 5,
    cookStyle: 'quick', difficulty: 'Medium', time: '20 min', serves: 2, calories: 620,
    emoji: '🍝', color: 'linear-gradient(135deg, #D97706, #F5F5DC)',
    photo: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80',
    tags: ['pasta', 'italian', 'egg', 'bacon', 'quick', 'classic'],
    description: 'Rome\'s perfect pasta — silky ribbons coated in a glossy emulsion of egg, Pecorino and guanciale. No cream, ever. The technique is everything.',
    ingredients: ['320g spaghetti or rigatoni', '200g guanciale (or pancetta as substitute)', '4 egg yolks + 1 whole egg', '100g Pecorino Romano, finely grated (or Parmesan)', 'Freshly ground black pepper — a lot', 'Pasta cooking water (reserved)', 'Salt for pasta water only'],
    steps: ['Cook pasta in generously salted water until al dente', 'Cut guanciale into small lardons, cook in dry pan on medium until fat renders and edges crisp — no oil needed', 'Remove pan from heat, let cool slightly (crucial — too hot scrambles eggs)', 'Whisk egg yolks, whole egg, most of the Pecorino together in bowl', 'Add pasta directly to guanciale pan (off heat), toss to coat in pork fat', 'Add egg mixture, toss rapidly while adding pasta water splash by splash', 'The starch in pasta water and residual heat creates the emulsion', 'Add more pasta water if needed — sauce should be glossy and coat each strand', 'Serve with remaining Pecorino and aggressive black pepper'],
    tip: 'NEVER use cream. The creaminess comes from emulsifying eggs with pasta starch water. Heat is your enemy — too much scrambles eggs. Off heat + pasta water + tossing = the technique. Guanciale (cured pork cheek) is traditional; pancetta is acceptable; bacon is not.'
  },
  {
    id: 'beef-steak', name: 'Perfect Pan-Seared Steak', cuisine: 'western', stars: 5,
    cookStyle: 'grilled', difficulty: 'Medium', time: '20 min', serves: 2, calories: 560,
    emoji: '🥩', color: 'linear-gradient(135deg, #7C1D1D, #C1292E)',
    photo: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
    tags: ['beef', 'steak', 'western', 'grilled', 'protein', 'restaurant-style'],
    description: 'Restaurant-quality steak at home — a deeply caramelized crust from the Maillard reaction, basted in garlic herb butter, rested to absolute perfection.',
    ingredients: ['2 ribeye or sirloin steaks (2.5cm thick)', '2 tbsp oil with high smoke point', '4 tbsp unsalted butter', '4 garlic cloves, crushed', 'Fresh thyme and rosemary sprigs', 'Flaky sea salt and coarse black pepper', 'Optional: Dijon mustard and peppercorn sauce to serve'],
    steps: ['Take steaks out of fridge 30 min before cooking — room temperature is crucial', 'Pat completely dry with paper towels — moisture is the enemy of crust', 'Season very generously with salt and pepper on all surfaces including edges', 'Heat cast-iron pan until smoking hot (3-4 min on high)', 'Add oil, carefully lay steak away from you', 'Sear without moving 2.5 min until deep brown crust forms', 'Flip once — sear 2 min more', 'Add butter, garlic, thyme — tilt pan, baste continuously 90 seconds', 'For medium-rare: internal temp 54-57°C. Rest on rack minimum 5 min', 'Slice against the grain, finish with flaky salt'],
    tip: 'The 3 non-negotiables: DRY steak (patted), HOT pan (smoking), RESTED meat. Cutting immediately loses all the juices. The rest period allows juice redistribution — skip it and watch your cutting board turn into a pool.'
  },
  {
    id: 'caesar-salad', name: 'Classic Caesar Salad', cuisine: 'western', stars: 5,
    cookStyle: 'no-cook', difficulty: 'Easy', time: '20 min', serves: 4, calories: 320,
    emoji: '🥗', color: 'linear-gradient(135deg, #15803D, #D97706)',
    photo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
    tags: ['salad', 'chicken', 'western', 'restaurant-style', 'classic'],
    description: 'The Caesar salad as it was meant to be — romaine with a glossy, anchovy-spiked dressing made from scratch, crispy croutons and a blizzard of Parmesan.',
    ingredients: ['2 heads romaine lettuce, leaves separated', '100g Parmesan, half finely grated, half shaved', 'For dressing: 2 anchovy fillets, 2 garlic cloves, 1 egg yolk, 1 tsp Dijon mustard, 1 tbsp Worcestershire sauce, 2 tbsp lemon juice, 80ml olive oil, 3 tbsp Parmesan grated, salt and pepper', 'For croutons: thick bread, olive oil, garlic, salt, Parmesan'],
    steps: ['Make croutons: cube bread, toss with olive oil, garlic and Parmesan, bake 180°C 12 min until golden', 'Make dressing: pound anchovies and garlic to paste in mortar', 'Whisk in egg yolk and Dijon', 'Whisk in Worcestershire and lemon juice', 'Slowly drizzle oil while whisking constantly to emulsify', 'Stir in grated Parmesan, season with salt and pepper — taste, it should be boldly flavored', 'Tear or chop romaine into large pieces', 'Dress leaves generously, toss to coat every leaf', 'Add most of the croutons, toss gently', 'Plate and top with shaved Parmesan and remaining croutons'],
    tip: 'A Caesar should be boldly dressed — underdressing is the biggest mistake. The emulsified dressing should coat every leaf. Use cold, crisp romaine and never add the croutons early or they go soggy.'
  },
  {
    id: 'fish-chips', name: 'Fish & Chips', cuisine: 'western', stars: 5,
    cookStyle: 'deep-fried', difficulty: 'Medium', time: '50 min', serves: 4, calories: 680,
    emoji: '🐟', color: 'linear-gradient(135deg, #1D4ED8, #D97706)',
    photo: 'https://images.unsplash.com/photo-1526234362653-3b75a0c07438?w=600&q=80',
    tags: ['fish', 'british', 'fried', 'beer-batter', 'chips', 'comfort'],
    description: 'Britain\'s greatest comfort food — beer-battered cod with a shatteringly light, airy crust alongside thick-cut chips twice-fried to fluffy-inside, crispy-outside perfection.',
    ingredients: ['4 thick cod or haddock fillets (200g each)', 'For beer batter: 200g self-raising flour, 200ml cold beer (lager), 1 tsp baking powder, salt', 'For chips: 1kg Maris Piper or Russet potatoes, oil for frying', 'To serve: mushy peas, tartare sauce, malt vinegar, lemon, newspaper (optional)'],
    steps: ['Peel and cut potatoes into thick chips, soak in cold water 30 min, dry thoroughly', 'First chip fry: heat oil to 140°C, fry chips 8 min until soft but not colored, drain', 'Make batter: whisk flour, baking powder and beer until just combined — lumps are fine, do not overmix', 'Heat oil to 185°C', 'Pat fish completely dry, season, coat in thin flour first, dip in batter', 'Lower into hot oil away from you, fry 6-8 min until golden and batter is crisp', 'While fish fries, second-fry chips at 185°C for 4 min until golden and crisp', 'Drain fish and chips on paper, season immediately with salt', 'Serve with malt vinegar, lemon and tartare sauce'],
    tip: 'Cold beer makes the lightest batter — carbon dioxide creates bubbles that steam and puff during frying. Lumps in the batter are fine. Over-mixing develops gluten and makes batter tough. The double-chip fry is non-negotiable for pub-quality results.'
  },

  // ── LUXURY (extra) ──
  {
    id: 'wagyu-steak', name: 'Wagyu Butter Steak', cuisine: 'luxury', stars: 5,
    cookStyle: 'grilled', difficulty: 'Easy', time: '15 min', serves: 2, calories: 680,
    emoji: '🥩', color: 'linear-gradient(135deg, #7C1D1D, #D97706)',
    photo: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
    tags: ['wagyu', 'steak', 'luxury', 'beef', 'premium'],
    description: 'A5 Wagyu — the most marbled beef on Earth — needs almost nothing: a screaming hot pan, excellent salt and less than 4 minutes of cooking. Pure opulence.',
    ingredients: ['2 A5 Wagyu ribeye steaks (150g each — Wagyu is incredibly rich, smaller portions)', 'Flaky sea salt only', 'Freshly cracked black pepper', 'No oil needed — Wagyu has more than enough internal fat', 'Wasabi, soy sauce and yuzu ponzu to serve (traditional Japanese way)'],
    steps: ['Remove Wagyu from fridge 15 min before cooking only (not 30 min — fat melts differently)', 'Heat cast-iron pan to very high until smoking — no oil', 'Season Wagyu with flaky salt only moments before cooking', 'Place in dry hot pan — you will hear intense sizzling immediately', 'Sear 90 seconds, do not touch', 'Flip, sear 90 seconds more', 'The internal fat renders and self-bastes the meat', 'Rest 3 minutes on warm plate', 'Slice thin, serve with condiments'],
    tip: 'Wagyu A5 should be served medium-rare to medium — the extraordinary intramuscular fat needs to render. Serving it well-done is a culinary crime. Smaller portions than regular beef because the richness is intense — a 150g serving is genuinely satisfying.'
  },
  {
    id: 'bouillabaisse', name: 'Bouillabaisse', cuisine: 'luxury', stars: 5,
    cookStyle: 'slow-cooked', difficulty: 'Hard', time: '3 hours', serves: 6, calories: 480,
    emoji: '🦐', color: 'linear-gradient(135deg, #1D4ED8, #F97316)',
    photo: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80',
    tags: ['seafood', 'french', 'soup', 'luxury', 'marseille', 'slow-cook'],
    description: 'Marseille\'s legendary fisherman\'s stew elevated to high art — a saffron-golden broth with multiple seafood, served with rouille-topped grilled bread. The seafood dish of Provence.',
    ingredients: ['1.5kg mixed firm fish: monkfish, John Dory, sea bass', '500g mussels and clams', '300g large shrimp or langoustines', 'For broth: fish bones and heads, 2 onions, fennel, leek, 4 tomatoes, 6 garlic, saffron threads, orange peel, bay, thyme, Pernod', 'For rouille: egg yolk, garlic, saffron, olive oil, cayenne, salt', 'Thick slices of baguette, grilled'],
    steps: ['Make broth: sauté vegetables in olive oil until soft, add fish bones and water, simmer 30 min, strain', 'Toast saffron in dry pan, add to broth with orange peel — simmer 20 min', 'Add firmest fish first (monkfish), simmer 8 min', 'Add delicate fish, mussels, clams — cook until shellfish open (5 min)', 'Add shrimp last, cook 3 min', 'Make rouille: blend garlic, saffron, cayenne, whisk in egg yolk, drizzle in olive oil', 'Grill thick baguette slices until charred', 'Spread rouille on bread', 'Serve broth in bowls with seafood, rouille crouton floating on top'],
    tip: 'The authentic Marseille rule: serve the broth first, then the fish on a separate platter. The rouille-topped crouton is placed in the broth at the table and dissolves to thicken it. Pernod is the traditional secret — it amplifies the anise-fennel notes of the broth.'
  },
];

/* ══════════════════════════════════════
   SUBSTITUTION DATABASE
══════════════════════════════════════ */
const SUBSTITUTIONS = [
  {
    icon: '🥚', ingredient: 'Eggs', category: 'Baking essential',
    options: [
      { icon: '🍌', text: '1 mashed banana (for moisture in cakes & muffins)' },
      { icon: '🌱', text: '1 tbsp flaxseed + 3 tbsp water, rested 5 min (flax egg)' },
      { icon: '🫘', text: '3 tbsp aquafaba (chickpea brine) — whips like egg whites!' },
      { icon: '🍎', text: '¼ cup unsweetened applesauce (for dense baked goods)' },
    ]
  },
  {
    icon: '🧈', ingredient: 'Butter', category: 'Fat',
    options: [
      { icon: '🫒', text: '¾ cup olive oil per cup of butter (savory only, reduces by ¼)' },
      { icon: '🥥', text: 'Equal amount of coconut oil (solid state, 1:1 ratio)' },
      { icon: '🥑', text: 'Mashed avocado for baked goods (½ ratio) — adds moisture' },
      { icon: '🍎', text: 'Applesauce (½ ratio) in sweet baked goods — reduces fat significantly' },
    ]
  },
  {
    icon: '🥛', ingredient: 'Milk', category: 'Dairy',
    options: [
      { icon: '🌰', text: 'Oat milk — neutral flavor, best for baking (1:1)' },
      { icon: '🥥', text: 'Coconut milk — adds richness and coconut notes (1:1)' },
      { icon: '🫘', text: 'Soy milk — high protein, closest to dairy (1:1)' },
      { icon: '🌾', text: 'Almond milk — thin, best for drinks & light sauces (1:1)' },
    ]
  },
  {
    icon: '🐟', ingredient: 'Fish Sauce', category: 'Seasoning',
    options: [
      { icon: '🥢', text: 'Soy sauce + splash of lime juice (1:1) — closest substitute' },
      { icon: '🦐', text: 'Worcestershire sauce — complex, slightly sweet (use less)' },
      { icon: '🫙', text: 'Coconut aminos — mild, slightly sweet, gluten-free (1:1)' },
      { icon: '🧄', text: 'Miso paste dissolved in water — umami forward option' },
    ]
  },
  {
    icon: '🌾', ingredient: 'All-Purpose Flour', category: 'Baking',
    options: [
      { icon: '🌰', text: 'Almond flour — gluten-free, adds moisture & fat (use ¾ cup)' },
      { icon: '🫘', text: 'Chickpea flour — protein-rich, slightly nutty (good for savory)' },
      { icon: '🍚', text: 'Rice flour — light, gluten-free, best for crispy coatings (1:1)' },
      { icon: '🌽', text: 'Oat flour — mild flavor, slightly dense results (1:1)' },
    ]
  },
  {
    icon: '🍷', ingredient: 'Cooking Wine', category: 'Liquid',
    options: [
      { icon: '🍇', text: 'Grape juice + splash of vinegar (non-alcoholic, 1:1)' },
      { icon: '🍎', text: 'Apple juice for white wine — adds sweetness (use half)' },
      { icon: '🥃', text: 'Extra chicken/beef stock + 1 tsp vinegar for acidity' },
      { icon: '🍋', text: 'Water + lemon juice + pinch of sugar — adds acid (1:1)' },
    ]
  },
  {
    icon: '🍋', ingredient: 'Lemon Juice', category: 'Acid',
    options: [
      { icon: '🫙', text: 'White wine vinegar — similar acidity (use same amount)' },
      { icon: '🍊', text: 'Lime juice — same acidity, slightly different flavor (1:1)' },
      { icon: '🍎', text: 'Apple cider vinegar — mild, fruity acid (use ½ the amount)' },
      { icon: '🫐', text: 'Tamarind paste thinned with water — for savory dishes only' },
    ]
  },
  {
    icon: '🧀', ingredient: 'Parmesan Cheese', category: 'Dairy',
    options: [
      { icon: '🌿', text: 'Nutritional yeast — vegan, nutty umami flavor (same amount)' },
      { icon: '🧀', text: 'Pecorino Romano — similar texture, slightly saltier (same ratio)' },
      { icon: '🫘', text: 'Aged Manchego — firm, salty, good melting properties' },
      { icon: '🥜', text: 'Cashew cheese (blended cashews, nutritional yeast, salt)' },
    ]
  },
];

/* ══════════════════════════════════════
   AI CHEF KNOWLEDGE BASE
══════════════════════════════════════ */
const AI_RESPONSES = {
  greetings: [
    "Hello! I'm Chef AI — your personal culinary assistant! I know 500+ recipes across 9 world cuisines. What shall we cook today? 🍽️",
    "Welcome to CulinaryAI! I'm here to help you create incredible dishes. Ask me about recipes, techniques, substitutions, or anything cooking-related! 👨‍🍳",
    "Hey there, aspiring chef! Ready to cook something amazing? Tell me what ingredients you have, what cuisine you're craving, or ask me anything about cooking! 🌟",
  ],
  substitutions: {
    'egg': "🥚 **Egg Substitutes:**\n• **Flax egg:** 1 tbsp ground flaxseed + 3 tbsp water, rest 5 min (best for dense baked goods)\n• **Banana:** ¼ mashed banana per egg (adds sweetness)\n• **Aquafaba:** 3 tbsp chickpea liquid per egg (can even be whipped!)\n• **Applesauce:** ¼ cup per egg (for moisture)\n\nFor binding: flax egg works best. For leavening: try extra baking powder.",
    'butter': "🧈 **Butter Substitutes:**\n• **Coconut oil** (1:1) — solid at room temp, neutral or coconut flavor\n• **Olive oil** (¾ cup per cup) — for savory dishes\n• **Avocado** — mashed, half the amount, adds creaminess\n• **Applesauce** — half the amount, for moist baked goods\n\nFor pastry & croissants, there's no real substitute — butter IS the recipe!",
    'milk': "🥛 **Milk Substitutes (all 1:1):**\n• **Oat milk** — neutral, best for baking\n• **Soy milk** — highest protein, closest to dairy\n• **Coconut milk** — adds richness and coconut flavor\n• **Almond milk** — thin, mild, good for drinks\n\nFor custards and cream sauces, full-fat coconut milk works best.",
    'fish sauce': "🐟 **Fish Sauce Substitutes:**\n• **Soy sauce + lime** — mix equal parts soy with a squeeze of lime (best substitute)\n• **Worcestershire sauce** — complex flavor, use ⅔ the amount\n• **Coconut aminos** — mild, sweet, gluten-free\n• **Miso + water** — strong umami, use half the amount dissolved\n\nNote: nothing perfectly replicates fish sauce's fermented depth!",
    'cream': "🫙 **Heavy Cream Substitutes:**\n• **Full-fat coconut milk** — use the thick part (great for curries & desserts)\n• **Greek yogurt** — for tang, use in sauces (don't boil or it'll curdle)\n• **Cashew cream** — blend soaked cashews with water until smooth\n• **Evaporated milk** — dairy-based, similar fat content",
  },
  conversions: {
    'cup': "📏 **Volume Conversions:**\n• 1 cup = 240ml = 16 tbsp = 48 tsp\n• ½ cup = 120ml = 8 tbsp\n• ¼ cup = 60ml = 4 tbsp\n• 1 tbsp = 15ml = 3 tsp\n\nFor flour: 1 cup ≈ 120-130g (spoon & level method)\nFor sugar: 1 cup ≈ 200g\nFor butter: 1 cup = 227g",
    'gram': "⚖️ **Common Weight Conversions:**\n• 1 oz = 28.35g\n• 1 lb = 453.6g\n• 100g = 3.5 oz\n• 1 kg = 2.2 lb\n\n**Common ingredients:**\n• 1 cup flour = 120-130g\n• 1 cup sugar = 200g\n• 1 cup butter = 227g\n• 1 cup rice = 190g",
    'fahrenheit': "🌡️ **Temperature Conversions:**\n• °C to °F: multiply by 1.8, add 32\n• °F to °C: subtract 32, divide by 1.8\n\n**Common baking temps:**\n• 325°F = 163°C\n• 350°F = 177°C (standard cake temp)\n• 375°F = 191°C\n• 400°F = 204°C\n• 425°F = 218°C",
  },
  techniques: {
    'sear': "🥩 **Perfect Searing:**\n1. Pat meat bone dry with paper towels (moisture = steaming, not searing)\n2. Season JUST before cooking\n3. Get pan smoking hot — a drop of water should immediately evaporate\n4. Don't crowd the pan\n5. DON'T TOUCH IT for 2-3 min until crust releases naturally\n6. Use clarified butter or high smoke-point oil\n\nResult: deep, caramelized Maillard crust = pure flavor.",
    'wok': "🥢 **Wok Hei Mastery:**\nWok hei (breath of the wok) is that smoky, complex flavor only achieved with:\n• Extremely high heat (higher than most home stoves)\n• Quick, constant movement\n• Pre-heated carbon steel wok (never non-stick!)\n\n**Tricks for home:**\n• Use your largest burner on highest setting\n• Cook in small batches\n• Toss food in the air briefly to expose to flame\n• Never use wet vegetables — dry thoroughly first",
    'knife': "🔪 **Knife Skills Fundamentals:**\n• **Julienne:** 2-3mm matchsticks — for stir-fries, salads\n• **Brunoise:** tiny 2mm cubes — for aromatics in sauces\n• **Chiffonade:** stack leaves, roll, slice thin — for herbs\n• **Bias cut:** diagonal slices — for vegetables in stir-fries\n\n**The claw grip is non-negotiable** — curl fingers inward, use knuckle as guide. A sharp knife is safer than a dull one!",
    'bread': "🍞 **The Bread Baking Essentials:**\n• **Autolyse:** Rest flour + water before adding salt — develops gluten naturally\n• **Stretch & fold:** Gentler than kneading, great for high-hydration doughs\n• **Bulk ferment:** Where most flavor develops — don't rush it\n• **Shaping:** Creates surface tension for good oven spring\n• **Score:** Allows controlled expansion in oven\n\nThe float test for starter: a spoonful should float at peak activity.",
  },
  temperatures: {
    'beef': "🥩 **Beef Internal Temperatures:**\n• Rare: 52°C / 125°F (bright red center)\n• Medium-rare: 57°C / 135°F (warm red center) ← IDEAL for most cuts\n• Medium: 63°C / 145°F (pink center)\n• Medium-well: 71°C / 160°F (slightly pink)\n• Well done: 77°C / 170°F (no pink)\n\n**Always rest 5-10 min** — temp rises 3-5°C after removing from heat.",
    'chicken': "🍗 **Chicken/Poultry Temperatures:**\n• Minimum safe: 74°C / 165°F (all parts)\n• Thighs & legs: Better at 80-85°C for rendered fat\n• Breast: Remove at 70°C — carryover takes it to 74°C\n\nUse a meat thermometer — this is the only reliable method. Color is not a safe indicator.",
    'oil': "🫒 **Oil Smoke Points:**\n• Avocado oil: 271°C / 520°F (best for high heat)\n• Ghee: 252°C / 485°F (ideal for Indian cooking)\n• Coconut oil (refined): 232°C / 450°F\n• Olive oil (light): 216°C / 420°F\n• Extra virgin olive oil: 190°C / 375°F\n• Butter: 150°C / 302°F (use clarified for higher heat)",
  },
  cuisines: {
    'indian': "🇮🇳 **Indian Cuisine Essentials:**\n• **Tempering (tadka):** Blooming whole spices in hot oil releases fat-soluble aromatics — always the base of Indian cooking\n• **Ginger-garlic paste:** The foundation of most curries (equal parts, blended)\n• **Must-have spices:** Cumin, coriander, turmeric, garam masala, chili powder\n• **Dum cooking:** Sealed slow-cooking in low heat — key to biryani\n\nThe secret to restaurant-quality curry: cook the onions much longer than you think necessary — until deep golden and caramelized.",
    'thai': "🇹🇭 **Thai Cuisine Essentials:**\n• **The flavor balance:** Every Thai dish balances sweet, sour, salty, spicy and umami\n• **Curry paste base:** Always fry paste in coconut cream first ('cracking the cream')\n• **Fish sauce:** The salt of Thai cooking — irreplaceable\n• **Fresh herbs last:** Thai basil, coriander and lime go in at the very end\n\nAromatic essentials: lemongrass, galangal, kaffir lime leaves, shrimp paste.",
    'chinese': "🇨🇳 **Chinese Cuisine Essentials:**\n• **Velveting:** Marinate meat in cornstarch, egg white & wine before cooking — gives silky texture\n• **The wok:** Minimum 30,000 BTU for authentic wok hei at restaurants; use highest home heat\n• **Seasoning trifecta:** Soy sauce, Shaoxing wine, sesame oil\n• **Mise en place:** Chinese cooking happens FAST — prep everything before heating the wok\n\nSichuan peppercorns create 'mala' — the numbing sensation unique to the cuisine.",
    'vietnamese': "🇻🇳 **Vietnamese Cuisine Essentials:**\n• **Fresh herbs are everything:** Vietnamese cooking uses enormous amounts of mint, perilla, Thai basil, and coriander\n• **Phở broth:** Char aromatics + toast spices + long simmer = depth\n• **Balance:** Fresh and light yet deeply flavorful — achieved through contrast\n• **Nuoc cham:** The universal dipping sauce — fish sauce, lime, sugar, chili, garlic\n\nVietnamese food celebrates texture contrast: soft noodles with crunchy bean sprouts, fresh herbs.",
    'myanmar': "🇲🇲 **Myanmar Cuisine Essentials:**\n• A unique crossroads of Indian, Chinese and Thai influences with distinct character\n• **Shrimp paste (ngapi):** The backbone of Burmese flavor — pungent and essential\n• **Laphet:** Fermented tea leaves — Myanmar's most distinctive ingredient\n• **Turmeric:** Used fresh (like ginger) for its earthy, slightly bitter flavor\n• **Mohinga** is often called Myanmar's national identity food\n\nMyanmar food is often more oily than neighboring cuisines — this is intentional and traditional.",
  },
  general: [
    "Great question! The key principle in cooking is building layers of flavor — start with aromatics, build your base, then season at every stage.",
    "Remember: seasoning throughout cooking gives much better results than seasoning only at the end. Taste as you go!",
    "The difference between a good cook and a great cook is almost always patience and organization (mise en place). Prep everything before you start cooking.",
    "Heat management is the most underrated cooking skill. Learn to control your heat and you can cook almost anything.",
    "Don't be afraid of salt — properly seasoned food should not taste salty, it should taste like itself but better.",
    "Acid (lemon juice, vinegar, wine) is as important as salt for balance. If a dish tastes flat, try adding a squeeze of lemon before adding more salt.",
  ],
};

/* ══════════════════════════════════════
   LUXURY RECIPES DATA
══════════════════════════════════════ */
const LUXURY_RECIPES = [
  { emoji: '🥩', name: 'Beef Wellington', desc: 'Tenderloin wrapped in mushroom duxelles & golden puff pastry', time: '3 hrs', difficulty: 'Advanced', color: 'linear-gradient(135deg, #1E1E3E, #4C1D95)', id: 'beef-wellington' },
  { emoji: '🦞', name: 'Lobster Thermidor', desc: 'Cognac cream sauce, Gruyère gratinéed in the shell', time: '60 min', difficulty: 'Advanced', color: 'linear-gradient(135deg, #7C1D1D, #DC2626)', id: 'lobster-thermidor' },
  { emoji: '🍄', name: 'Truffle Risotto', desc: 'Carnaroli rice, aged Parmigiano & shaved black truffle', time: '45 min', difficulty: 'Medium', color: 'linear-gradient(135deg, #3B0764, #6D28D9)', id: 'truffle-risotto' },
  { emoji: '🦆', name: 'Duck Confit', desc: '24-hour cure, slow-cooked in duck fat until silken', time: '26 hrs', difficulty: 'Advanced', color: 'linear-gradient(135deg, #451A03, #92400E)', id: 'duck-confit' },
  { emoji: '🍮', name: 'Crème Brûlée', desc: 'Silky vanilla custard with a shatteringly crisp caramel top', time: '3 hrs', difficulty: 'Medium', color: 'linear-gradient(135deg, #78350F, #D97706)', id: 'creme-brulee' },
  { emoji: '🥗', name: 'Caesar Salad (Original)', desc: 'Romaine, anchovy dressing, hand-grated Parmesan, croutons', time: '20 min', difficulty: 'Easy', color: 'linear-gradient(135deg, #14532D, #15803D)', id: null },
];

/* ══════════════════════════════════════
   BAKERY MINI CARDS DATA
══════════════════════════════════════ */
const BAKERY_ITEMS = [
  { emoji: '🥐', name: 'Butter Croissants', desc: '27-layer laminated French pastry', time: '24 hrs', stars: '⭐⭐⭐⭐⭐', id: 'croissant' },
  { emoji: '🎂', name: 'French Macarons', desc: 'Almond meringue with ganache filling', time: '4 hrs', stars: '⭐⭐⭐⭐⭐', id: 'macarons' },
  { emoji: '🍩', name: 'Choux Pastry Éclairs', desc: 'Light pastry, chocolate glaze, vanilla cream', time: '90 min', stars: '⭐⭐⭐⭐', id: null },
  { emoji: '🫐', name: 'Blueberry Tart', desc: 'Buttery shell, pastry cream, fresh berries', time: '2 hrs', stars: '⭐⭐⭐⭐⭐', id: null },
  { emoji: '🍰', name: 'Japanese Cheesecake', desc: 'Impossibly fluffy, jiggly cotton-soft cake', time: '3 hrs', stars: '⭐⭐⭐⭐⭐', id: null },
  { emoji: '🧁', name: 'Danish Pastries', desc: 'Laminated dough with fruit or cream cheese', time: '18 hrs', stars: '⭐⭐⭐⭐', id: null },
];

/* ══════════════════════════════════════
   MYANMAR CARDS DATA
══════════════════════════════════════ */
const MYANMAR_CARDS = [
  { emoji: '🐟', name: 'Mohinga', desc: 'Fish noodle soup — the national soul dish', id: 'mohinga' },
  { emoji: '🌿', name: 'Laphet Thohk', desc: 'Legendary fermented tea leaf salad', id: 'laphet-thohk' },
  { emoji: '🍜', name: 'Shan Noodles', desc: 'Highland tomato-pork rice noodles', id: 'shan-noodles' },
  { emoji: '🍲', name: 'Khow Suey', desc: 'Coconut noodle soup with toppings bar', id: null },
  { emoji: '🥗', name: 'Gyin Thohk', desc: 'Fresh ginger salad with sesame', id: null },
  { emoji: '🍚', name: 'Nga Htamin', desc: 'Fish rice with golden turmeric crust', id: null },
];

/* ══════════════════════════════════════
   TECHNIQUE KNOWLEDGE BASE
══════════════════════════════════════ */
const TECHNIQUES = {
  knife: {
    title: '🔪 Knife Skills Masterclass',
    intro: 'Precise knife skills transform your cooking from amateur to professional. These cuts are the foundation of every cuisine.',
    steps: [
      { icon: '✋', title: 'The Claw Grip', desc: 'Curl your fingers inward, use your knuckle as a guide for the blade. This is the non-negotiable safety technique every cook must master.' },
      { icon: '📐', title: 'Julienne (2-3mm sticks)', desc: 'Square off vegetable, slice into planks, stack planks and cut into matchsticks. Essential for stir-fries and salads.' },
      { icon: '🎲', title: 'Brunoise (2mm cubes)', desc: 'Julienne first, then rotate and cut across into tiny cubes. Used for aromatics in sauces and refined garnishes.' },
      { icon: '🌿', title: 'Chiffonade', desc: 'Stack herb leaves, roll tightly into a cylinder, slice across into ribbons. Perfect for basil, mint and lettuce.' },
      { icon: '🔪', title: 'Bias Cut', desc: 'Cut vegetables at a 45° angle for elongated pieces with more surface area — better flavor absorption in stir-fries.' },
    ]
  },
  sauces: {
    title: '🥣 The 5 French Mother Sauces',
    intro: 'Auguste Escoffier codified these 5 mother sauces in the early 1900s. Master these and you can make hundreds of derivative sauces.',
    steps: [
      { icon: '⬜', title: 'Béchamel (White Sauce)', desc: 'Butter + flour (roux) + hot milk. Base for: Mornay (cheese sauce), Soubise, Lasagna sauce, Croquettes.' },
      { icon: '🍗', title: 'Velouté (Blond Sauce)', desc: 'Roux + light stock (chicken, fish or veal). Base for: Supreme sauce, Allemande, Normande (seafood).' },
      { icon: '🟤', title: 'Espagnole (Brown Sauce)', desc: 'Dark roux + dark stock + tomato. Rich and complex. Base for: Demi-glace, Bordelaise, Chasseur (hunter\'s sauce).' },
      { icon: '🍅', title: 'Sauce Tomat', desc: 'Tomatoes cooked with aromatics and stock. Base for: Marinara, Creole sauce, Arrabiata, Spanish sauce.' },
      { icon: '💛', title: 'Hollandaise (Emulsified)', desc: 'Egg yolks + clarified butter + acid (lemon). Most temperamental. Base for: Béarnaise, Maltaise, Mousseline.' },
    ]
  },
  wok: {
    title: '🥢 Wok Hei Mastery',
    intro: 'Wok hei (鑊氣) literally means "breath of the wok" — that smoky, slightly charred flavor you can only get from ultra-high heat cooking.',
    steps: [
      { icon: '⚡', title: 'The Right Pan', desc: 'Use a carbon steel wok — never non-stick. Season it properly: heat until smoking, add oil, heat again, wipe clean.' },
      { icon: '🔥', title: 'Maximum Heat', desc: 'Preheat your wok for 3-4 minutes until it\'s smoking. Restaurant woks use 30,000+ BTU burners. Use your highest home burner.' },
      { icon: '💧', title: 'Dry Everything', desc: 'Pat vegetables completely dry. Water = steam = no char = no wok hei. This is the most common home cook mistake.' },
      { icon: '🏃', title: 'Small Batches', desc: 'Never overcrowd the wok. Cook in 2 batches and combine — the temperature drop from too much food destroys wok hei.' },
      { icon: '🔄', title: 'Toss, Don\'t Stir', desc: 'Tossing food exposes it to direct flame briefly. Practice the wrist toss motion: forward and up, catch the food back.' },
    ]
  },
  spices: {
    title: '🌶️ Spice Blooming & Tempering',
    intro: 'Whole spices contain flavor compounds locked in cell walls. Heat in fat releases these aromatics into the food in ways that ground spices cannot replicate.',
    steps: [
      { icon: '🫙', title: 'Whole vs Ground', desc: 'Whole spices last 2-3 years; ground spices lose potency in 6 months. Toast and grind your own whenever possible.' },
      { icon: '🫒', title: 'Blooming in Fat', desc: 'Add whole spices to hot oil BEFORE other ingredients. The fat extracts fat-soluble compounds. This is the backbone of Indian tadka.' },
      { icon: '🌡️', title: 'Temperature Matters', desc: 'Medium heat for most spices — too hot burns them (tastes bitter), too cool and they don\'t release aromatics.' },
      { icon: '👂', title: 'Listen for the Sizzle', desc: 'Mustard seeds should pop, cumin seeds should sizzle and turn slightly golden. This takes 30-60 seconds, not 5 seconds.' },
      { icon: '💨', title: 'Dry Toasting', desc: 'For garam masala and whole spices: dry toast in a pan until fragrant, cool, then grind. The difference is profound.' },
    ]
  },
  bread: {
    title: '🍞 Bread & Lamination Science',
    intro: 'Bread baking is applied science. Understanding the role of gluten, yeast, and temperature unlocks everything.',
    steps: [
      { icon: '🌱', title: 'The Starter (Sourdough)', desc: 'A culture of wild yeast and bacteria. Feed 1:1:1 (starter:flour:water) every 12-24 hours. Ready when it doubles and floats.' },
      { icon: '💪', title: 'Gluten Development', desc: 'Mixing flour + water creates gluten networks. These give structure and hold CO₂ bubbles. Autolyse + stretch & fold = strong gluten without over-kneading.' },
      { icon: '⏱️', title: 'Fermentation Time', desc: 'This is where flavor develops. Longer, cooler fermentation = more complex taste. Bulk ferment at 78°F until 75% volume increase.' },
      { icon: '🎨', title: 'Shaping', desc: 'Creates surface tension on the dough exterior. This tension pushes the dough upward in the oven (oven spring) rather than spreading.' },
      { icon: '🔥', title: 'The Bake: Steam First', desc: 'Steam in the first 20 minutes keeps crust pliable for oven spring. Use a Dutch oven or add a pan of boiling water. Then remove steam for crust color.' },
    ]
  },
  emulsion: {
    title: '🫙 Emulsification Mastery',
    intro: 'An emulsion is fat droplets suspended in water (or vice versa). Understanding why they work — and why they break — is key to sauces.',
    steps: [
      { icon: '🔬', title: 'The Science', desc: 'Water and oil don\'t mix. Emulsifiers (lecithin in egg yolks, mustard) have both water-loving and fat-loving parts, bridging the two phases.' },
      { icon: '🥄', title: 'Mayonnaise', desc: 'Whisk egg yolk, add oil drop by drop initially, then in a thin stream. The yolk lecithin emulsifies up to 20x its volume in oil. Add 1 tsp water if it breaks.' },
      { icon: '🥗', title: 'Vinaigrette', desc: '3:1 oil to acid ratio. Add mustard as emulsifier. Shake vigorously. It\'s a temporary emulsion — it will separate (that\'s normal).' },
      { icon: '🍷', title: 'Pan Sauce', desc: 'Deglaze with wine, reduce, then mount with cold butter (monter au beurre). Add butter off heat, swirl — never boil after adding butter or it breaks.' },
      { icon: '🚑', title: 'Rescuing a Broken Emulsion', desc: 'Start fresh with a new yolk, slowly whisk in the broken mayo. Or add ice-cold water one drop at a time while whisking vigorously.' },
    ]
  },
  stock: {
    title: '🍲 Stock & Broth Fundamentals',
    intro: 'A great stock is the foundation of professional cooking. It takes time but minimal skill, and the difference from store-bought is immense.',
    steps: [
      { icon: '🦴', title: 'Bones First: Blanch or Roast', desc: 'For clear stock: blanch bones 5 min, discard water, clean. For dark stock: roast at 220°C until deep brown. Roasting = Maillard = flavor.' },
      { icon: '🧅', title: 'The Mirepoix', desc: '2:1:1 ratio of onion, carrot, celery. This aromatic base is the soul of Western stocks. Don\'t skip it.' },
      { icon: '🌿', title: 'Bouquet Garni', desc: 'Tie thyme, bay leaves, parsley stems, peppercorns in a cheesecloth bundle. Herbs go in the last hour — long cooking makes them bitter.' },
      { icon: '🧊', title: 'Cold Water Start', desc: 'Always start with cold water — proteins rise slowly as foam for easy skimming. Hot water makes proteins set in the stock (cloudy).' },
      { icon: '⏰', title: 'Time & Temperature', desc: 'Chicken: 4-6 hrs | Beef/veal: 8-12 hrs | Fish: 20-30 min only! Never boil — a gentle simmer (barely bubbling) makes clear, clean stock.' },
    ]
  },
  pastry: {
    title: '🧁 The Science of Pastry',
    intro: 'Pastry is the most scientific of culinary disciplines. Understanding fat, sugar, and gluten behavior lets you bake with precision and confidence.',
    steps: [
      { icon: '🧈', title: 'Fat & Flakiness', desc: 'Cold fat creates flaky pastry — it melts in the oven, releasing steam that separates layers. Warm fat gets incorporated into flour, creating mealy (short) pastry.' },
      { icon: '🌾', title: 'Gluten Control', desc: 'Overworking develops gluten → tough pastry. Handle cold, work quickly, rest in fridge. Acid (vinegar) and fat both inhibit gluten formation.' },
      { icon: '🍬', title: 'Sugar\'s Role', desc: 'Sugar: sweetness, browning (Maillard + caramelization), moisture retention, tenderness. Reducing sugar changes texture dramatically — it\'s not just sweetness.' },
      { icon: '🥚', title: 'Eggs: Structure & Enrichment', desc: 'Whole eggs: structure, color, richness. Yolks only: tender, rich, golden. Whites only: structure, dryness. Egg wash = shine and browning.' },
      { icon: '🔬', title: 'Leavening Chemistry', desc: 'Baking soda (base) needs acid to activate. Baking powder is self-contained (acid+base). Too much = soapy taste. Too little = dense result. Always measure precisely.' },
    ]
  },
  grilling: {
    title: '🔥 Grilling & BBQ Mastery',
    intro: 'Grilling is one of humanity\'s oldest cooking methods — but achieving perfect char, juicy interiors, and safe food requires understanding heat zones and timing.',
    steps: [
      { icon: '♨️', title: 'Two-Zone Setup', desc: 'Always create a direct heat zone (high) and an indirect zone (low/no heat). Sear over direct heat to form a crust, then move to indirect to finish cooking through without burning.' },
      { icon: '🧂', title: 'The Dry Brine', desc: 'Salt meat 1-24 hours ahead. Salt draws moisture out, then re-absorbs with dissolved proteins — creating a natural brine that seasons deep and helps form a superior crust.' },
      { icon: '🌡️', title: 'Internal Temperature', desc: 'Chicken: 74°C | Pork: 63°C | Beef rare: 52°C, medium: 60°C, well: 71°C. A probe thermometer costs less than one ruined steak — it is the most valuable grill tool you own.' },
      { icon: '⏸️', title: 'Rest Before Cutting', desc: 'Rest meat 5-10 minutes after cooking. Muscle fibres relax and juices redistribute. Cut immediately and the juice runs onto the board, not into your mouth.' },
      { icon: '🔥', title: 'Char Marks & Crust', desc: 'Press meat firmly onto the grill and do NOT move it for 2-3 minutes. The grill must be clean and lightly oiled. A good sear releases naturally — if it sticks, it\'s not ready to flip.' },
    ]
  },
  braising: {
    title: '🍖 Braising & Slow Cooking',
    intro: 'Braising converts tough, cheap cuts into fork-tender masterpieces. It\'s the technique behind red wine beef, pork belly, oxtail, and every great Sunday roast.',
    steps: [
      { icon: '🥩', title: 'Choose the Right Cut', desc: 'Braising works for collagen-rich cuts: shoulder, shank, brisket, oxtail, short rib. These are tough when roasted fast but dissolve into silky richness after hours of gentle moist heat.' },
      { icon: '🔥', title: 'Sear First — Always', desc: 'Brown meat in batches in a Dutch oven until deep mahogany on all sides. Don\'t move it — let the crust form. This Maillard reaction creates flavour compounds that infuse the entire braise.' },
      { icon: '💧', title: 'Liquid Level Matters', desc: 'Braising is NOT boiling. Liquid should reach 1/3 to 1/2 up the meat. The trapped steam does the work. Too much liquid = watery result. Too little = the bottom scorches.' },
      { icon: '⏰', title: 'Low & Slow Temperature', desc: '150-165°C oven for 2-4+ hours. Collagen (tough connective tissue) converts to gelatin at 70°C+ sustained heat. This gelatin gives braised meat its silky, lip-coating, melt-in-mouth texture.' },
      { icon: '🫙', title: 'Reduce the Braising Liquid', desc: 'Remove the meat, skim the fat, then boil the braising liquid until it coats a spoon. This concentrated reduction becomes your sauce. Strain it, season it — it\'s the best part of the dish.' },
    ]
  },
  steaming: {
    title: '♨️ Asian Steaming Techniques',
    intro: 'Steaming is the gentlest cooking method — it preserves nutrients, colour, and delicate textures that no other technique can. Essential for dim sum, fish, and vegetables.',
    steps: [
      { icon: '🎍', title: 'Bamboo Steamer Setup', desc: 'Line tiers with parchment paper or blanched cabbage leaves to prevent sticking. Stack multiple tiers with the item needing most time on the bottom. Keep water at a rolling boil; never let it run dry.' },
      { icon: '🐟', title: 'Steaming Fish Perfectly', desc: 'Place fish on a deep plate that fits inside the steamer. Steam whole fish 8-10 min per 450g. Done when flesh flakes at the thickest point. Finish by pouring sizzling hot oil over ginger and spring onion.' },
      { icon: '🥟', title: 'Dim Sum Technique', desc: 'Consistent steam is critical — too weak = soggy, too fierce = burst wrappers. Use parchment squares under each piece. Fresh dumplings: 6-8 min. Larger baos: 10-12 min. Open lid with a cloth to avoid drips.' },
      { icon: '🥦', title: 'Vegetables: Lock in Colour', desc: 'Steam leafy greens 1-3 minutes — remove while still vivid green. Plunge immediately into ice water to halt cooking and set the chlorophyll. Season after cooling for the brightest colour and crunch.' },
      { icon: '🍚', title: 'Fluffy Steamed Rice', desc: 'For separate, fluffy grains: soak jasmine rice 30 min, drain, steam over boiling water on a perforated tray 20-25 min, fluff gently, rest covered 5 min. Far superior texture to the absorption method.' },
    ]
  },
  maillard: {
    title: '🤎 Maillard Reaction & Browning',
    intro: 'Two browning reactions create most of the flavour you love in cooked food. Understanding them lets you control colour, crust, and taste with precision in every dish.',
    steps: [
      { icon: '🔬', title: 'What is the Maillard Reaction?', desc: 'At 140-165°C, amino acids and sugars react to form hundreds of new flavour and aroma compounds. It gives bread crust, seared steak, roasted coffee, and toasted nuts their irresistible smell and taste.' },
      { icon: '🍬', title: 'Caramelisation is Different', desc: 'Caramelisation is purely sugar decomposing at 160-180°C — no protein needed. It produces bittersweet, complex notes. Crème brûlée, caramel sauce, and deeply golden onions all rely on this reaction.' },
      { icon: '💧', title: 'Moisture is the Enemy', desc: 'Water boils at 100°C — Maillard starts at 140°C. Wet food cannot brown. Pat food completely dry before searing. Crowding the pan creates steam and prevents any browning. Cook in batches if needed.' },
      { icon: '🍳', title: 'Pan Choice Matters', desc: 'Cast iron retains heat when cold food is added — it keeps searing instead of dropping below browning temperature. Thin pans cool too fast. Preheat your pan fully before adding oil, then add food.' },
      { icon: '🍞', title: 'Using Browning Deliberately', desc: 'Add a pinch of sugar to marinades for better crust. Use butter to finish a pan sauce (milk solids brown via Maillard). Brush bread with egg wash for golden colour. Dry surfaces + high heat = flavour.' },
    ]
  },
  deepfrying: {
    title: '🍟 Deep Frying Science',
    intro: 'Deep frying is precision cooking. Oil temperature is more critical than any timer. Master the temperatures and you\'ll produce restaurant-quality fried food at home.',
    steps: [
      { icon: '🌡️', title: 'Temperature Zones', desc: '150°C: blanching fries (first cook). 170°C: most frying (chicken, fish, spring rolls). 180-190°C: final crisping, doughnuts. Above 200°C oil breaks down rapidly. Always use a thermometer.' },
      { icon: '💨', title: 'Why Frying Creates Crisp', desc: 'When food enters hot oil, moisture rapidly evaporates as steam. This steam pressure prevents oil from penetrating. Once removed from heat, steam stops, the surface dries and forms a crispy shell.' },
      { icon: '🧊', title: 'Cold Batter for Tempura', desc: 'Tempura batter must stay near ice-cold. Cold batter + hot oil = explosive steam burst = ultra-light, lacy coating. Mix lumpy — overmixing develops gluten, making a heavy, doughy coating.' },
      { icon: '🥊', title: 'Double Fry Technique', desc: 'First fry at 150°C to cook through, then rest 5-10 min to let moisture redistribute. Second fry at 185°C for 60-90 seconds creates insane crunch. Korean fried chicken uses this for extreme crispiness.' },
      { icon: '♻️', title: 'Oil Care', desc: 'Filter used oil through a fine mesh after each use. Store in a dark, cool place. Oil darkens with use — very dark oil gives bitter flavour in less time. Discard when it foams heavily or smells rancid.' },
    ]
  },
  plating: {
    title: '🎨 Plating & Presentation',
    intro: 'We eat with our eyes first. A beautifully plated dish signals care and quality before a single bite. These professional techniques translate directly to the home kitchen.',
    steps: [
      { icon: '🔢', title: 'The Rule of Odds', desc: 'Odd numbers of elements look more natural and dynamic than even numbers. Three scallops, five herb dots, seven garnish leaves — odd groupings draw the eye more naturally than symmetrical pairs.' },
      { icon: '🏛️', title: 'Height & Structure', desc: 'Build food upward for visual interest — lean proteins against vegetables, stack elements intentionally. The plate should look like architecture, not a pile. Ensure it holds its shape when carried to the table.' },
      { icon: '🌈', title: 'Colour Balance', desc: 'Aim for at least 3 distinct colours per plate. A simple rule: one warm colour (protein or sauce), one vibrant green (herb or vegetable), one pale neutral (starch or foam). Avoid brown-on-brown monotony.' },
      { icon: '💧', title: 'Sauce Technique', desc: 'Sauce goes under the protein or sweeping around it — not poured over the top (which hides texture and crust). Use a squeeze bottle for dots and lines. Drag a spoon through a pool for a professional smear.' },
      { icon: '✨', title: 'Finishing Elements', desc: 'Flaky salt on meat, micro herbs on sauces, citrus zest, a drizzle of aged balsamic or good olive oil, edible flowers. These add visual height, fresh aroma, and textural contrast in a single deliberate move.' },
    ]
  },
  marinating: {
    title: '🫙 Marinating & Curing',
    intro: 'Marinades add flavour and tenderise. Curing transforms and preserves. Both are time-based techniques where understanding the science reliably produces better results.',
    steps: [
      { icon: '⚗️', title: 'The Marinade Trinity', desc: 'Every marinade has three components: Fat (carries fat-soluble flavours and bastes), Acid (citrus/vinegar — tenderises the surface), Aromatics (garlic, herbs, spices — the flavour). Balance all three.' },
      { icon: '⏱️', title: 'Time by Protein', desc: 'Fish: 15-30 min max (acid cooks the flesh). Chicken breast: 2-8 hrs. Pork/lamb: 4-24 hrs. Beef: 6-48 hrs. Exceed the maximum and over-tenderising creates an unpleasant mushy texture.' },
      { icon: '🧂', title: 'Dry Rubs vs Wet Marinades', desc: 'Dry rubs (salt + spice) penetrate deeper than wet marinades. Salt draws moisture out, then re-absorbs carrying flavour deep into the meat. Apply 1-24 hrs before cooking. Exceptional for BBQ and roasting.' },
      { icon: '🥩', title: 'Salt Curing', desc: 'Coat meat in salt (plus sugar and spices), refrigerate 24-72 hrs. Osmosis draws water out, concentrating flavour and firming texture. This is how gravlax, cured egg yolks, pancetta, and bacon are made.' },
      { icon: '🍋', title: 'Acid Curing: Ceviche', desc: 'Lime juice acid denatures fish proteins — turning them opaque exactly as heat does. Use very fresh fish. 10-20 min gives a semi-cooked texture. 30+ min for fully opaque, firm \'cooked\' appearance.' },
    ]
  },
  fermentation: {
    title: '🫧 Fermentation Fundamentals',
    intro: 'Fermentation transforms raw ingredients into something more complex, nutritious and deeply flavourful. From kimchi to miso to sourdough — it underlies global food culture.',
    steps: [
      { icon: '🦠', title: 'What is Fermentation?', desc: 'Microorganisms (bacteria, yeast, mould) consume sugars and produce acids, alcohol, and CO₂. Lactic acid fermentation — used for kimchi, yoghurt, and pickles — relies on lactobacillus naturally present on vegetables.' },
      { icon: '🧂', title: 'Salt as Selective Pressure', desc: 'Salt kills harmful bacteria while lactobacillus (salt-tolerant) thrives. The standard ratio is 2% salt by weight — 20g salt per 1kg vegetables. Too little = spoilage risk. Too much = fermentation stalls.' },
      { icon: '🥬', title: 'Making Kimchi', desc: 'Massage cabbage with 2% salt, rest 2 hours, then rinse. Mix with gochugaru (chilli flakes), fish sauce, garlic, ginger, and spring onion. Pack tightly into a jar with no air gaps. Ferment at room temp 1-5 days, then refrigerate.' },
      { icon: '🍜', title: 'Koji & Miso', desc: 'Koji mould (Aspergillus oryzae) produces enzymes that break down proteins and starches into glutamates — pure umami. Mix koji with salt and soybeans, seal, and age 3-12 months. The same mould produces sake, soy sauce, and mirin.' },
      { icon: '🫙', title: 'Quick Lacto-Pickles', desc: 'Dissolve 2% salt in filtered water (chlorinated tap water kills beneficial bacteria). Submerge vegetables completely using a weight. Cover loosely to let CO₂ escape. Taste daily — ready in 3-7 days when pleasantly tangy.' },
    ]
  }
};

/* ══════════════════════════════════════
   YOUTUBE VIDEO DATABASE
══════════════════════════════════════ */
const VIDEOS = [
  // ── INDIAN ──
  {
    cuisine: 'indian',
    title: 'Restaurant-Style Butter Chicken',
    desc: 'Master the rich tomato-cream sauce with proper spice blooming technique. Step-by-step for home cooks.',
    youtubeId: 'h_ZWXncC0CI',
    searchQuery: 'butter chicken recipe restaurant style',
    time: '18 min watch', chef: 'Joshua Weissman',
    note: '🌟 Watch how the tadka (spice tempering) creates the signature deep orange color.'
  },
  {
    cuisine: 'indian',
    title: 'Authentic Chicken Biryani (Hyderabadi)',
    desc: 'Dum biryani from scratch — parboiling, layering, sealing and the full dum process explained.',
    youtubeId: 'R_8bBhHLk2Y',
    searchQuery: 'hyderabadi chicken biryani dum recipe',
    time: '25 min watch', chef: 'Cooking Shooking',
    note: '💡 Pay attention to the rice parboiling — it should be exactly 70% cooked before layering.'
  },
  {
    cuisine: 'indian',
    title: 'Perfect Dal Makhani (24-hr Method)',
    desc: 'Slow-cooked black lentils the authentic way. Restaurant secrets revealed for home kitchens.',
    youtubeId: 'HoXkHi0RaEA',
    searchQuery: 'dal makhani authentic recipe slow cooked',
    time: '15 min watch', chef: 'Kunal Kapur',
    note: '🔥 The overnight soak and extended simmer are non-negotiable for creamy texture.'
  },
  // ── CHINESE ──
  {
    cuisine: 'chinese',
    title: 'Authentic Kung Pao Chicken (Sichuan)',
    desc: 'The real Sichuan version with numbing peppercorns, dried chilies and the perfect sauce ratio.',
    youtubeId: 'qSFVnl9tMJE',
    searchQuery: 'kung pao chicken authentic sichuan recipe',
    time: '12 min watch', chef: 'Chinese Cooking Demystified',
    note: '⚡ Maximum wok heat and pre-prepared sauce are the two keys to this dish.'
  },
  {
    cuisine: 'chinese',
    title: 'Dim Sum Har Gow from Scratch',
    desc: 'Crystal shrimp dumplings with translucent wrappers — the technique that defines Cantonese excellence.',
    youtubeId: 'yBbUdlzMNWU',
    searchQuery: 'har gow shrimp dumplings dim sum from scratch',
    time: '20 min watch', chef: 'Daddy Lau',
    note: '🥟 The wheat starch dough MUST be made with boiling water — this is critical for translucency.'
  },
  {
    cuisine: 'chinese',
    title: 'Mapo Tofu with Authentic Doubanjiang',
    desc: 'Silky silken tofu in fiery numbing sauce — the full Sichuan technique from start to finish.',
    youtubeId: 'thIDsAGM7Aw',
    searchQuery: 'mapo tofu authentic sichuan doubanjiang recipe',
    time: '10 min watch', chef: 'Woks of Life',
    note: '🌶️ Use Sichuan peppercorn oil generously at the end — it\'s what creates the mala sensation.'
  },
  // ── KOREAN ──
  {
    cuisine: 'korean',
    title: 'Crispy Korean Fried Chicken',
    desc: 'Double-fried ultra-crispy chicken with sweet-spicy yangnyeom sauce — Korea\'s ultimate street food.',
    youtubeId: 'kQT9w8lbb2U',
    searchQuery: 'korean fried chicken crispy yangnyeom recipe',
    time: '20 min watch', chef: 'Joshua Weissman',
    note: '🍗 Double-frying at two different temperatures is the secret to glass-shattering crispy skin.'
  },
  {
    cuisine: 'korean',
    title: 'Bibimbap — Korean Mixed Rice Bowl',
    desc: 'Vibrant seasoned vegetables, gochujang sauce, and a perfectly fried egg over hot rice.',
    youtubeId: 'J0OkNMoOJYA',
    searchQuery: 'bibimbap authentic korean mixed rice bowl recipe',
    time: '35 min watch', chef: 'Maangchi',
    note: '🥢 Use a heated dolsot (stone bowl) for the crispy rice crust — it\'s what makes dolsot bibimbap legendary.'
  },
  {
    cuisine: 'korean',
    title: 'Kimchi Jjigae (Kimchi Stew)',
    desc: 'Korea\'s most comforting stew — deeply fermented kimchi, pork belly, tofu, and silky broth.',
    youtubeId: 'I7-HmGXJuDE',
    searchQuery: 'kimchi jjigae stew authentic korean recipe',
    time: '25 min watch', chef: 'Maangchi',
    note: '🌶️ Use old, very sour kimchi — over-fermented kimchi makes the richest, most flavorful stew.'
  },
  // ── THAI ──
  {
    cuisine: 'thai',
    title: 'Street-Style Pad Thai with Shrimp',
    desc: 'Thailand\'s street food icon made at home — including making fresh tamarind sauce from scratch.',
    youtubeId: 'TzNhMOAD7HA',
    searchQuery: 'pad thai authentic street food recipe shrimp',
    time: '14 min watch', chef: 'Pailin\'s Kitchen',
    note: '🍜 Use the highest heat possible and resist the urge to stir — let the noodles develop color.'
  },
  {
    cuisine: 'thai',
    title: 'Thai Green Curry (Paste from Scratch)',
    desc: 'Making green curry paste from fresh ingredients and the full curry technique including coconut cream cracking.',
    youtubeId: 'g1L-YuFJxnw',
    searchQuery: 'thai green curry paste from scratch authentic recipe',
    time: '22 min watch', chef: 'Pailin\'s Kitchen',
    note: '🥥 Cracking the coconut cream (frying paste in the thick cream) is the crucial first step.'
  },
  {
    cuisine: 'thai',
    title: 'Authentic Tom Yum Goong (Two Versions)',
    desc: 'Both clear and creamy versions of Thailand\'s famous hot-sour shrimp soup, explained side-by-side.',
    youtubeId: 'vGQaFVkW2qE',
    searchQuery: 'tom yum goong authentic thai recipe shrimp',
    time: '16 min watch', chef: 'Hot Thai Kitchen',
    note: '🍋 Add lime juice off the heat — cooking it makes the flavor bitter and flat.'
  },
  // ── VIETNAMESE ──
  {
    cuisine: 'vietnamese',
    title: 'Beef Phở from Scratch (Restaurant Quality)',
    desc: 'The full broth process — charring, toasting spices, long simmer and proper seasoning technique.',
    youtubeId: 'r3PS2qjCE6Q',
    searchQuery: 'beef pho from scratch authentic vietnamese recipe broth',
    time: '28 min watch', chef: 'Helen\'s Recipes',
    note: '🔥 Charring the onion and ginger until blackened creates the irreplaceable smoky-sweet depth.'
  },
  {
    cuisine: 'vietnamese',
    title: 'Perfect Bánh Mì at Home',
    desc: 'Baking the perfect Vietnamese baguette, making quick pickles and assembling the ultimate sandwich.',
    youtubeId: 'qDuTKETbL3w',
    searchQuery: 'banh mi vietnamese sandwich recipe homemade',
    time: '18 min watch', chef: 'Vicky Pham',
    note: '🥖 The contrast of warm bread, cold pickles and fresh herbs is what makes bánh mì magical.'
  },
  // ── MYANMAR ──
  {
    cuisine: 'myanmar',
    title: 'Mohinga — Myanmar\'s National Dish',
    desc: 'Step-by-step guide to making Myanmar\'s beloved fish noodle soup with authentic ingredients.',
    youtubeId: 'sBcn-QDvhP4',
    searchQuery: 'mohinga myanmar fish noodle soup national dish recipe',
    time: '20 min watch', chef: 'Myanmar Kitchen',
    note: '🐟 The broth should turn golden-yellow from turmeric and have a subtle lemongrass fragrance.'
  },
  {
    cuisine: 'myanmar',
    title: 'Laphet Thohk (Tea Leaf Salad)',
    desc: 'Making Myanmar\'s most unique dish with fermented tea leaves, crispy toppings and the perfect dressing.',
    youtubeId: 'Tn3FcVfANHk',
    searchQuery: 'laphet thohk burmese tea leaf salad recipe',
    time: '12 min watch', chef: 'Burmese Kitchen',
    note: '🌿 Mix everything together at the last moment to preserve the crunch of all the elements.'
  },
  {
    cuisine: 'myanmar',
    title: 'Shan Noodles from the Highland Kitchen',
    desc: 'Traditional Shan-style noodles with tomato-pork sauce — simple, hearty and deeply flavorful.',
    youtubeId: 'LNIVpAX2UPQ',
    searchQuery: 'shan noodles myanmar recipe tomato pork',
    time: '15 min watch', chef: 'Myanmar Cuisine',
    note: '🍅 Cook the tomatoes until the sauce is almost dry — this concentrates all the flavor beautifully.'
  },
  // ── BAKERY ──
  {
    cuisine: 'bakery',
    title: 'How to Make Perfect Croissants',
    desc: 'The complete croissant making process — from lamination to proofing to baking the perfect golden layers.',
    youtubeId: 'ulTCYBMxFyU',
    searchQuery: 'how to make croissants laminated dough recipe',
    time: '32 min watch', chef: 'Joshua Weissman',
    note: '🧈 Temperature is everything — if butter starts to squirt out, immediately chill the dough.'
  },
  {
    cuisine: 'bakery',
    title: 'Beginner Sourdough Bread (Full Process)',
    desc: 'From creating a starter to the final bake — everything you need for your first perfect loaf.',
    youtubeId: 'bFHf_uFHkME',
    searchQuery: 'sourdough bread beginner guide starter recipe',
    time: '45 min watch', chef: 'Binging with Babish',
    note: '🍞 The starter must pass the float test before using — a spoonful should float in water.'
  },
  {
    cuisine: 'bakery',
    title: 'French Macarons — No-Fail Method',
    desc: 'Italian meringue method, perfect macaronage technique and common mistakes to avoid.',
    youtubeId: 'bOCqEkq5fS4',
    searchQuery: 'french macarons recipe no fail italian meringue',
    time: '25 min watch', chef: 'Preppy Kitchen',
    note: '🎂 The ribbon test: batter dropped from spatula should disappear back in exactly 30 seconds.'
  },
  {
    cuisine: 'bakery',
    title: 'Classic Crème Brûlée (Perfect Every Time)',
    desc: 'Silky custard, proper water bath technique and the right way to caramelize the top.',
    youtubeId: 'YbXjc4NKPkk',
    searchQuery: 'creme brulee recipe classic french custard',
    time: '14 min watch', chef: 'Gordon Ramsay',
    note: '🔥 The center must wobble like jello when baked — it firms up fully during refrigeration.'
  },
  // ── LUXURY ──
  {
    cuisine: 'luxury',
    title: 'Beef Wellington — Easiest Method',
    desc: 'Perfect beef Wellington every time — duxelles, prosciutto wrap, puff pastry, and exact internal temp.',
    youtubeId: '5BzvDJ9I4jg',
    searchQuery: 'beef wellington recipe easy home cook',
    time: '22 min watch', chef: 'Joshua Weissman',
    note: '🥩 The mushroom duxelles MUST be completely dry — moisture makes the pastry soggy.'
  },
  {
    cuisine: 'luxury',
    title: 'Truffle Risotto — Restaurant Method',
    desc: 'The mantecatura technique, proper stock addition, and achieving the perfect all\'onda (wave) consistency.',
    youtubeId: 'FTzivFiMcCY',
    searchQuery: 'truffle risotto restaurant method mantecatura recipe',
    time: '16 min watch', chef: 'Marco Pierre White',
    note: '🍄 The cold butter mantecatura off the heat is what transforms good risotto into great risotto.'
  },
  {
    cuisine: 'luxury',
    title: 'Duck Confit — Classic French Method',
    desc: 'Salt curing, slow cooking in duck fat, and achieving that perfectly shatteringly crisp skin.',
    youtubeId: '0_sQ6IkFYdQ',
    searchQuery: 'duck confit classic french recipe salt curing',
    time: '18 min watch', chef: 'Jacques Pépin',
    note: '🦆 Start the skin-side in a cold pan and heat slowly — this renders fat without burning.'
  },
  // ── COFFEE ──
  {
    cuisine: 'coffee',
    title: 'How to Make Espresso at Home (Beginner)',
    desc: 'Everything you need to know about espresso: grind size, tamping, extraction time, and reading your shot.',
    youtubeId: 'e7FMrPrhuiY',
    searchQuery: 'how to make espresso at home beginner guide',
    time: '12 min watch', chef: 'James Hoffmann',
    note: '☕ A perfect espresso: 18-20g coffee in, 36-40g liquid out, in 25-30 seconds.'
  },
  {
    cuisine: 'coffee',
    title: 'The French Press: Stop Making Mistakes',
    desc: 'The definitive guide to French press — grind size, steep time, pressing technique, and why most people get it wrong.',
    youtubeId: 'st571DYYTR8',
    searchQuery: 'french press coffee perfect technique james hoffmann',
    time: '11 min watch', chef: 'James Hoffmann',
    note: '🫖 Use coarse grind, 4-minute steep, and stir before pressing — never plunge with force.'
  },
  {
    cuisine: 'coffee',
    title: 'Pour Over Coffee — V60 Complete Guide',
    desc: 'Master the Hario V60 pour-over from grind to bloom to pour. Unlock clarity and complexity in your cup.',
    youtubeId: 'AI4ynXzkSQo',
    searchQuery: 'v60 pour over coffee complete guide technique',
    time: '19 min watch', chef: 'James Hoffmann',
    note: '💧 The 30-second bloom is essential — it degasses CO2 so water extracts evenly throughout the brew.'
  },
  {
    cuisine: 'coffee',
    title: 'Cold Brew Coffee: Beginner to Expert',
    desc: 'Three methods from easy to pro: mason jar cold brew, Toddy system, and slow-drip Japanese style.',
    youtubeId: 'PApBycDrPo0',
    searchQuery: 'cold brew coffee recipe beginner to expert methods',
    time: '14 min watch', chef: 'Sprometheus',
    note: '❄️ Use a 1:8 coffee-to-water ratio and steep 16-20 hours in the fridge for clean, low-acid concentrate.'
  },
  {
    cuisine: 'coffee',
    title: 'AeroPress — The Only Recipe You Need',
    desc: 'James Hoffmann\'s world-renowned AeroPress recipe — the inverted method that won the World AeroPress Championship.',
    youtubeId: 'j6Cs0s8-0j8',
    searchQuery: 'aeropress best recipe inverted method hoffmann',
    time: '8 min watch', chef: 'James Hoffmann',
    note: '🏆 AeroPress winner tip: 11g coffee, 200ml water at 80°C, 2-minute steep, gentle press over 30 seconds.'
  },
  {
    cuisine: 'coffee',
    title: 'Latte Art for Beginners — Heart & Rosette',
    desc: 'How to texture milk, find the perfect microfoam, and pour a heart and rosette latte art pattern from scratch.',
    youtubeId: 'x5nOFCbOFKc',
    searchQuery: 'latte art tutorial beginner heart rosette milk foam',
    time: '20 min watch', chef: 'Seattle Coffee Gear',
    note: '🎨 Microfoam should look like glossy, wet paint — if it looks bubbly, you\'ve over-steamed it.'
  },
  {
    cuisine: 'coffee',
    title: 'Siphon Coffee — Science Lab Brewing',
    desc: 'The theatrical siphon (vacuum pot) method — vapor pressure physics meets pour-over precision. Advanced brewing at its finest.',
    youtubeId: '5j2I3m8CNFI',
    searchQuery: 'siphon vacuum pot coffee brewing advanced technique',
    time: '16 min watch', chef: 'European Coffee Trip',
    note: '⚗️ Siphon extracts at ~92°C via vapor pressure — the result is remarkably clean and complex, like tea clarity with coffee depth.'
  },
  {
    cuisine: 'coffee',
    title: 'How Coffee is Roasted (Light vs Dark)',
    desc: 'From green bean to roasted coffee — understanding roast profiles, Maillard reaction, and how to choose beans for your brew method.',
    youtubeId: 'L-HCPBjDaLA',
    searchQuery: 'coffee roasting process light dark roast explained',
    time: '18 min watch', chef: 'Jonathan Gagne',
    note: '🔥 Light roast = more origin flavor, more caffeine. Dark roast = roasty bitterness, less caffeine. Neither is "stronger" — it\'s just different flavor.'
  },
];

/* ══════════════════════════════════════
   RECIPE EXTRAS — YouTube, Nutrition, Diet
   (All calorie/nutrition values are estimated)
══════════════════════════════════════ */
const RECIPE_EXTRAS = {
  'butter-chicken': {
    youtubeId: 'h_ZWXncC0CI',
    nutrition: { protein: 38, carbs: 18, fat: 28, fiber: 3, sodium: 820 },
    dietTags: ['High Protein', 'Gluten-Free', 'Low Carb'],
    dietNote: 'Rich in protein from chicken breast. Tomato sauce provides lycopene antioxidants. Use light cream or yogurt to reduce fat by ~40%.'
  },
  'biryani': {
    youtubeId: 'R_8bBhHLk2Y',
    nutrition: { protein: 42, carbs: 68, fat: 22, fiber: 4, sodium: 940 },
    dietTags: ['High Protein', 'High Energy', 'Festive'],
    dietNote: 'A complete meal with excellent macro balance. Saffron and turmeric are powerful anti-inflammatory compounds. Best as a main meal with raita on the side.'
  },
  'palak-paneer': {
    youtubeId: 'HoXkHi0RaEA',
    nutrition: { protein: 18, carbs: 12, fat: 22, fiber: 5, sodium: 620 },
    dietTags: ['Vegetarian', 'Iron-Rich', 'Gluten-Free', 'Low Carb'],
    dietNote: 'Spinach is one of the richest plant sources of iron and folate. Paneer provides calcium and complete protein. Squeeze lemon over to enhance iron absorption.'
  },
  'dal-makhani': {
    youtubeId: 'n7Eiwa0yEJM',
    nutrition: { protein: 16, carbs: 44, fat: 18, fiber: 12, sodium: 580 },
    dietTags: ['Vegetarian', 'High Fiber', 'Plant Protein', 'Heart-Healthy'],
    dietNote: 'Black lentils rank among the best plant protein sources. 12g fiber per serving supports excellent digestive health. Reduce butter by half for a lighter, equally delicious version.'
  },
  'kung-pao-chicken': {
    youtubeId: 'qSFVnl9tMJE',
    nutrition: { protein: 35, carbs: 14, fat: 22, fiber: 3, sodium: 980 },
    dietTags: ['High Protein', 'Low Carb', 'Gluten-Free Option'],
    dietNote: 'Peanuts contribute healthy monounsaturated fats and extra protein. Capsaicin in dried chilies can boost metabolism by up to 5%. Use tamari soy sauce to make fully gluten-free.'
  },
  'dim-sum': {
    youtubeId: 'yBbUdlzMNWU',
    nutrition: { protein: 14, carbs: 22, fat: 8, fiber: 1, sodium: 460 },
    dietTags: ['Low Fat', 'Steamed', 'Portion-Controlled'],
    dietNote: 'Steaming is one of the healthiest cooking methods — no added fat. Shrimp provides selenium, iodine and lean protein. Naturally portion-controlled by design.'
  },
  'mapo-tofu': {
    youtubeId: 'thIDsAGM7Aw',
    nutrition: { protein: 18, carbs: 8, fat: 18, fiber: 2, sodium: 820 },
    dietTags: ['Vegan Option', 'Gluten-Free', 'Low Carb', 'Plant Protein'],
    dietNote: 'Tofu delivers complete plant protein with all essential amino acids plus calcium. Capsaicin in Sichuan chilies is an antioxidant. Omit pork entirely for a fully vegan dish.'
  },
  'pad-thai': {
    youtubeId: 'TzNhMOAD7HA',
    nutrition: { protein: 28, carbs: 58, fat: 18, fiber: 3, sodium: 1200 },
    dietTags: ['Gluten-Free', 'Balanced', 'Complete Meal'],
    dietNote: 'Rice noodles are naturally gluten-free. Bean sprouts add vitamins B and C with minimal calories. A genuinely balanced one-dish meal — protein, carbs and fat in healthy ratio.'
  },
  'green-curry': {
    youtubeId: 'g1L-YuFJxnw',
    nutrition: { protein: 32, carbs: 14, fat: 38, fiber: 4, sodium: 860 },
    dietTags: ['Dairy-Free', 'Gluten-Free', 'Keto-Friendly'],
    dietNote: 'Coconut milk provides medium-chain triglycerides (MCTs) that are rapidly metabolized for energy. Lemongrass and galangal are clinically proven anti-inflammatory agents. Low-carb without rice.'
  },
  'tom-yum': {
    youtubeId: 'vGQaFVkW2qE',
    nutrition: { protein: 24, carbs: 8, fat: 8, fiber: 2, sodium: 1400 },
    dietTags: ['Low Calorie', 'Low Fat', 'High Protein', 'Gluten-Free', 'Keto'],
    dietNote: 'At only 180 kcal, one of the most satisfying low-calorie dishes in the world. Lemongrass has antifungal and anti-inflammatory properties. Note: sodium is high from fish sauce — reduce if needed.'
  },
  'pho': {
    youtubeId: 'r3PS2qjCE6Q',
    nutrition: { protein: 28, carbs: 52, fat: 12, fiber: 3, sodium: 1100 },
    dietTags: ['Gluten-Free', 'High Protein', 'Healing Broth'],
    dietNote: 'Long-simmered bone broth is exceptionally rich in collagen, gelatin and trace minerals. Star anise has documented anti-bacterial and digestive properties. Add extra herbs and sprouts for more nutrients at zero calories.'
  },
  'banh-mi': {
    youtubeId: 'qDuTKETbL3w',
    nutrition: { protein: 22, carbs: 42, fat: 14, fiber: 3, sodium: 820 },
    dietTags: ['Balanced', 'Fresh Herbs'],
    dietNote: 'Fresh coriander, mint and perilla provide vitamins A, C and K. Quick pickling adds probiotics. More nutritionally balanced than most Western sandwiches thanks to abundant fresh herbs and vegetables.'
  },
  'mohinga': {
    youtubeId: 'sBcn-QDvhP4',
    nutrition: { protein: 26, carbs: 44, fat: 12, fiber: 4, sodium: 760 },
    dietTags: ['Gluten-Free', 'Omega-3 Rich', 'Low Fat'],
    dietNote: 'Catfish is an excellent source of omega-3 fatty acids supporting heart and brain health. Turmeric (fresh) contains curcumin — one of the most studied anti-inflammatory natural compounds. A truly wholesome meal.'
  },
  'laphet-thohk': {
    youtubeId: 'Tn3FcVfANHk',
    nutrition: { protein: 12, carbs: 18, fat: 16, fiber: 6, sodium: 580 },
    dietTags: ['Antioxidant Powerhouse', 'Gluten-Free', 'Low Calorie', 'Probiotic'],
    dietNote: 'Fermented tea leaves (laphet) contain extraordinarily high concentrations of polyphenol antioxidants — more than most teas. Traditionally revered in Myanmar for longevity and digestion. A truly unique superfood salad.'
  },
  'shan-noodles': {
    youtubeId: 'LNIVpAX2UPQ',
    nutrition: { protein: 24, carbs: 52, fat: 16, fiber: 3, sodium: 680 },
    dietTags: ['Gluten-Free', 'Balanced', 'Comfort Food'],
    dietNote: 'Rice noodles are gentle on digestion and suitable for sensitive stomachs. Tomatoes provide lycopene. One of the cleaner, less oily noodle dishes in Southeast Asian cuisine.'
  },
  'bibimbap': {
    youtubeId: 'J0OkNMoOJYA',
    nutrition: { protein: 28, carbs: 68, fat: 16, fiber: 6, sodium: 840 },
    dietTags: ['Balanced', 'High Fiber', 'Nutrient Dense', 'Probiotic'],
    dietNote: 'Bibimbap is nutritionally exceptional — diverse vegetables provide a wide spectrum of vitamins and phytonutrients. Gochujang contains capsaicin which boosts metabolism. The egg contributes complete protein and choline for brain health. A genuinely balanced, colorful meal.'
  },
  'kimchi-jjigae': {
    youtubeId: 'I7-HmGXJuDE',
    nutrition: { protein: 22, carbs: 14, fat: 18, fiber: 5, sodium: 1100 },
    dietTags: ['Probiotic Rich', 'Gluten-Free', 'Low Carb', 'Gut Health'],
    dietNote: 'Kimchi is one of the world\'s most potent probiotic foods — fermentation creates billions of beneficial bacteria per gram. Tofu provides complete plant protein and isoflavones. High in sodium but the probiotics actively support gut and immune health.'
  },
  'korean-fried-chicken': {
    youtubeId: 'kQT9w8lbb2U',
    nutrition: { protein: 38, carbs: 32, fat: 28, fiber: 2, sodium: 760 },
    dietTags: ['High Protein', 'Indulgence'],
    dietNote: 'The double-fry method actually results in less oil absorption than single-fry — the first fry sets the crust. Chicken provides high-quality protein and B vitamins. Best enjoyed as an occasional treat paired with vegetables.'
  },
  'bulgogi': {
    youtubeId: 'ZruAfXHBrNk',
    nutrition: { protein: 34, carbs: 16, fat: 20, fiber: 1, sodium: 680 },
    dietTags: ['High Protein', 'Iron-Rich', 'Zinc-Rich', 'Low Carb'],
    dietNote: 'Thinly sliced rib-eye provides highly bioavailable iron and zinc — superior absorption compared to plant sources. The pear marinade tenderizes without heavy oil. Sesame oil provides vitamin E and healthy unsaturated fats.'
  },
  'tteokbokki': {
    youtubeId: 'RdG_YZxFMHo',
    nutrition: { protein: 8, carbs: 72, fat: 4, fiber: 3, sodium: 920 },
    dietTags: ['Vegan Option', 'Dairy-Free', 'Low Fat', 'Street Food'],
    dietNote: 'Rice cakes are naturally gluten-free and low in fat. Gochujang contains capsaicin and beneficial fermented compounds. Skip fish cakes for a fully vegan version. High in carbohydrates — best as a energizing snack or paired with protein.'
  },
  'croissant': {
    youtubeId: 'ulTCYBMxFyU',
    nutrition: { protein: 6, carbs: 34, fat: 18, fiber: 1, sodium: 320 },
    dietTags: ['Vegetarian', 'Indulgence', 'Breakfast Treat'],
    dietNote: 'High in saturated fat from European butter — best as an occasional treat. Pair with protein (eggs, ham, cheese) or fresh fruit to create a nutritionally balanced breakfast. Quality over quantity!'
  },
  'sourdough': {
    youtubeId: 'bFHf_uFHkME',
    nutrition: { protein: 5, carbs: 22, fat: 1, fiber: 2, sodium: 240 },
    dietTags: ['Vegan', 'Fermented', 'Gut Health', 'Low Fat', 'Low GI'],
    dietNote: 'Long fermentation reduces phytic acid by up to 90%, dramatically improving mineral absorption. Lower glycemic index than commercial bread — better blood sugar response. Live cultures support gut microbiome diversity.'
  },
  'macarons': {
    youtubeId: 'bOCqEkq5fS4',
    nutrition: { protein: 3, carbs: 18, fat: 5, fiber: 1, sodium: 40 },
    dietTags: ['Naturally Gluten-Free', 'Vegetarian', 'Indulgence', 'Portion-Friendly'],
    dietNote: 'Naturally gluten-free from almond flour. Almonds provide vitamin E, magnesium and healthy monounsaturated fats. Built-in portion control — enjoy 2-3 as a mindful treat. Low sodium for a sweet.'
  },
  'creme-brulee': {
    youtubeId: 'YbXjc4NKPkk',
    nutrition: { protein: 7, carbs: 28, fat: 26, fiber: 0, sodium: 80 },
    dietTags: ['Naturally Gluten-Free', 'Vegetarian', 'Special Occasion', 'Indulgence'],
    dietNote: 'A classic indulgence — high in cream and egg yolks which provide fat-soluble vitamins A, D, E and K. The vanilla bean contains antioxidants. Best reserved for special occasions and savored slowly.'
  },
  'beef-wellington': {
    youtubeId: '5BzvDJ9I4jg',
    nutrition: { protein: 48, carbs: 28, fat: 42, fiber: 2, sodium: 680 },
    dietTags: ['High Protein', 'Iron-Rich', 'Zinc-Rich', 'Special Occasion'],
    dietNote: 'Beef tenderloin is one of the leanest cuts despite being the most tender. Exceptionally rich in iron, zinc, selenium and B12. Mushroom duxelles adds fiber, B vitamins and deep umami with minimal calories added.'
  },
  'lobster-thermidor': {
    youtubeId: 'MFKBez7Ggys',
    nutrition: { protein: 46, carbs: 8, fat: 32, fiber: 1, sodium: 920 },
    dietTags: ['High Protein', 'Keto-Friendly', 'Luxury', 'Low Carb'],
    dietNote: 'Lobster is lean, high-protein seafood rich in selenium, copper and iodine — essential for thyroid function. The cream and Gruyère add richness but the dish is surprisingly moderate in fat for a luxury preparation.'
  },
  'truffle-risotto': {
    youtubeId: 'FTzivFiMcCY',
    nutrition: { protein: 18, carbs: 58, fat: 28, fiber: 2, sodium: 640 },
    dietTags: ['Vegetarian', 'Gluten-Free', 'Comfort Food', 'Satisfying'],
    dietNote: 'Arborio rice releases resistant starch during cooking which acts as prebiotic fiber for gut bacteria. Parmesan provides calcium and B12. Truffles contain antioxidant compounds and trace minerals.'
  },
  'duck-confit': {
    youtubeId: '0_sQ6IkFYdQ',
    nutrition: { protein: 52, carbs: 2, fat: 54, fiber: 0, sodium: 820 },
    dietTags: ['High Protein', 'Keto-Friendly', 'Very Low Carb', 'Iron-Rich'],
    dietNote: 'Duck fat is 49% monounsaturated fat — similar profile to olive oil, making it one of the healthiest animal fats. Extremely low in carbs. Rich in iron, zinc and B vitamins. Protein content rivals most cuts. Portion mindfully.'
  },
  // ── NEW INDIAN ──
  'chicken-tikka-masala': {
    youtubeId: 'a03U45jFxOI',
    nutrition: { protein: 36, carbs: 16, fat: 26, fiber: 3, sodium: 860 },
    dietTags: ['High Protein', 'Gluten-Free', 'Low Carb'],
    dietNote: 'Charring the chicken before adding to sauce reduces overall fat while boosting flavor through Maillard reactions. Using yogurt instead of cream lowers saturated fat by 35% while maintaining creaminess.'
  },
  'rogan-josh': {
    youtubeId: 'H7g8jl60eDg',
    nutrition: { protein: 44, carbs: 8, fat: 32, fiber: 2, sodium: 740 },
    dietTags: ['High Protein', 'Iron-Rich', 'Gluten-Free', 'Low Carb'],
    dietNote: 'Lamb is exceptionally rich in bioavailable iron and zinc. Kashmiri chili provides capsaicin for metabolism. Yogurt adds probiotics. Bone-in lamb releases collagen into the sauce for additional gut-supporting gelatin.'
  },
  'samosa': {
    youtubeId: 'Gy9WinLCBbA',
    nutrition: { protein: 4, carbs: 22, fat: 9, fiber: 3, sodium: 280 },
    dietTags: ['Vegetarian', 'Street Food'],
    dietNote: 'Baked samosas (brush with oil and bake at 200°C 20 min) reduce fat by 60% vs deep-fried. Potato filling provides potassium and vitamin C. Peas add plant protein and fiber. Mint chutney is virtually calorie-free.'
  },
  'aloo-gobi': {
    youtubeId: 'Z2R8nnM2zI0',
    nutrition: { protein: 6, carbs: 32, fat: 8, fiber: 7, sodium: 380 },
    dietTags: ['Vegan', 'Gluten-Free', 'High Fiber', 'Low Calorie', 'Heart-Healthy'],
    dietNote: 'Cauliflower is extraordinarily nutrient-dense: vitamin C, K, folate and sulforaphane (cancer-protective). Turmeric and cumin are among the most studied anti-inflammatory spices. One of the most nutritionally efficient Indian dishes.'
  },
  // ── NEW CHINESE ──
  'char-siu': {
    youtubeId: 'ARvSGosxBmY',
    nutrition: { protein: 34, carbs: 20, fat: 22, fiber: 0, sodium: 880 },
    dietTags: ['High Protein', 'Dairy-Free', 'Gluten-Free Option'],
    dietNote: 'Pork shoulder provides rich B12, thiamine and zinc. The honey glaze creates Maillard reactions that are carcinogen-free at oven temperatures. Use tamari instead of soy for gluten-free version. Excellent protein-to-calorie ratio.'
  },
  'beef-chow-mein': {
    youtubeId: 'Z1PJ1E7FrXQ',
    nutrition: { protein: 28, carbs: 48, fat: 16, fiber: 4, sodium: 1100 },
    dietTags: ['High Protein', 'Dairy-Free', 'Balanced'],
    dietNote: 'Egg noodles provide complete protein from eggs plus B vitamins. Bean sprouts add vitamins B and C with near-zero calories. Oyster sauce is lower in sodium than soy sauce. A well-balanced one-wok meal with protein, carbs, vegetables.'
  },
  'sweet-sour-pork': {
    youtubeId: 'fDRDoeBFUP4',
    nutrition: { protein: 28, carbs: 46, fat: 20, fiber: 3, sodium: 720 },
    dietTags: ['High Protein', 'Dairy-Free'],
    dietNote: 'Bell peppers provide exceptional vitamin C — more than citrus fruit. Pineapple contains bromelain, a natural enzyme that supports digestion. The double-fry method creates a crust that absorbs less oil than a single longer fry.'
  },
  'xiao-long-bao': {
    youtubeId: 'yBbUdlzMNWU',
    nutrition: { protein: 16, carbs: 26, fat: 10, fiber: 1, sodium: 520 },
    dietTags: ['Steamed', 'Portion-Controlled', 'Dairy-Free'],
    dietNote: 'Steamed dumplings are among the most virtuous Chinese cooking methods — minimal added fat. Pork provides iron and B vitamins. The collagen-rich soup jelly inside becomes liquid gelatin when hot, supporting joint and gut health.'
  },
  // ── NEW THAI ──
  'massaman-curry': {
    youtubeId: 'g1L-YuFJxnw',
    nutrition: { protein: 34, carbs: 32, fat: 38, fiber: 5, sodium: 780 },
    dietTags: ['Gluten-Free', 'Dairy-Free', 'High Protein', 'Balanced'],
    dietNote: 'Peanuts contribute heart-healthy monounsaturated fats, resveratrol and plant protein. Cardamom and cinnamon regulate blood sugar. The slow braise breaks down beef collagen into gelatin. One of the most complete nutrient profiles of any curry.'
  },
  'mango-sticky-rice': {
    youtubeId: 'qTCXKMxhJ14',
    nutrition: { protein: 5, carbs: 78, fat: 14, fiber: 3, sodium: 120 },
    dietTags: ['Vegan', 'Gluten-Free', 'Dairy-Free'],
    dietNote: 'Mango is exceptionally rich in vitamin C (60% RDA per serving), beta-carotene, and folate. Glutinous rice provides sustained energy. Coconut milk contains MCTs for rapid energy. A naturally dairy-free dessert with real nutritional value.'
  },
  'som-tam': {
    youtubeId: 'FCgRpPKwqfI',
    nutrition: { protein: 8, carbs: 22, fat: 4, fiber: 4, sodium: 960 },
    dietTags: ['Low Calorie', 'Vegan Option', 'Gluten-Free', 'Raw', 'High Fiber'],
    dietNote: 'Green papaya is exceptionally high in papain (digestive enzyme), vitamin C and folate. At only 140kcal this is one of Thailand\'s most nutritious dishes. Chilies boost metabolism. Lime juice adds vitamin C and enhances iron absorption. Note sodium from fish sauce.'
  },
  // ── NEW VIETNAMESE ──
  'fresh-spring-rolls': {
    youtubeId: 'pQjMHxHo4rE',
    nutrition: { protein: 14, carbs: 28, fat: 4, fiber: 3, sodium: 480 },
    dietTags: ['Low Calorie', 'Gluten-Free', 'Low Fat', 'High Protein', 'Fresh'],
    dietNote: 'Rice paper is gluten-free and very low calorie. Shrimp provides lean protein, selenium and iodine. The abundance of fresh herbs (mint, basil, coriander) delivers vitamins A, C, K and powerful antioxidants. One of the healthiest ways to eat.'
  },
  'bun-bo-hue': {
    youtubeId: 'r3PS2qjCE6Q',
    nutrition: { protein: 32, carbs: 48, fat: 16, fiber: 3, sodium: 1200 },
    dietTags: ['Gluten-Free', 'High Protein', 'Healing Broth'],
    dietNote: 'Long-simmered pork and beef broth is extraordinarily rich in collagen, gelatin and minerals. Lemongrass has documented anti-inflammatory and digestive benefits. Shrimp paste provides iodine and fermented compounds. High sodium — reduce fish sauce if needed.'
  },
  'com-tam': {
    youtubeId: 'qDuTKETbL3w',
    nutrition: { protein: 36, carbs: 58, fat: 16, fiber: 2, sodium: 860 },
    dietTags: ['High Protein', 'Gluten-Free Option', 'Balanced', 'Complete Meal'],
    dietNote: 'Broken rice has the same nutritional profile as regular rice — the "broken" refers only to grain size. Lemongrass pork provides protein and B vitamins. Nuoc cham adds bright flavor with minimal calories. A genuinely balanced complete meal.'
  },
  // ── NEW MYANMAR ──
  'ohn-no-khao-swe': {
    youtubeId: 'sBcn-QDvhP4',
    nutrition: { protein: 32, carbs: 52, fat: 28, fiber: 4, sodium: 820 },
    dietTags: ['Gluten-Free', 'High Protein', 'Coconut MCT'],
    dietNote: 'Chickpea flour is naturally gluten-free and rich in plant protein and fiber. Coconut milk provides MCTs for rapid energy. Turmeric\'s curcumin is anti-inflammatory. The protein-rich toppings (egg, dried shrimp) make this a truly complete meal.'
  },
  'myanmar-curry': {
    youtubeId: 'sBcn-QDvhP4',
    nutrition: { protein: 42, carbs: 6, fat: 36, fiber: 2, sodium: 780 },
    dietTags: ['High Protein', 'Gluten-Free', 'Low Carb', 'Iron-Rich'],
    dietNote: 'Beef provides highly bioavailable iron, zinc and B12. Myanmar curries use generous oil which is predominantly unsaturated when using vegetable oil. Turmeric is one of nature\'s most potent anti-inflammatory agents. Minimal carbohydrates without rice.'
  },
  'myanmar-tea-leaf-rice': {
    youtubeId: 'Tn3FcVfANHk',
    nutrition: { protein: 10, carbs: 46, fat: 12, fiber: 5, sodium: 640 },
    dietTags: ['Gluten-Free', 'Antioxidant Rich', 'Probiotic', 'Unique'],
    dietNote: 'Toasted sesame seeds are rich in calcium, magnesium and lignans (hormone-balancing). Tamarind provides vitamin C and tartaric acid for digestion. This humble rice dish delivers surprising nutritional breadth through its diverse topping components.'
  },
  // ── NEW BAKERY ──
  'cinnamon-rolls': {
    youtubeId: 'qt0oXKnOkXc',
    nutrition: { protein: 7, carbs: 52, fat: 16, fiber: 2, sodium: 280 },
    dietTags: ['Vegetarian', 'Indulgence', 'Breakfast Treat'],
    dietNote: 'Cinnamon has evidence-based blood-sugar-lowering properties — adding flavor with a metabolic benefit. Bread flour\'s higher protein creates the chewy, springy structure. Enjoy as a weekly treat paired with protein (eggs, Greek yogurt) for a balanced breakfast.'
  },
  'tiramisu': {
    youtubeId: 'CS-OBPQPaLE',
    nutrition: { protein: 9, carbs: 38, fat: 26, fiber: 0, sodium: 100 },
    dietTags: ['Gluten-Free Option', 'Vegetarian', 'Make-Ahead', 'Special Occasion'],
    dietNote: 'Mascarpone provides fat-soluble vitamins A, D, E and K. Espresso delivers antioxidants and caffeine. Eggs contribute complete protein and choline for brain health. The airy egg whites reduce density vs commercial versions. Use gluten-free ladyfingers for GF version.'
  },
  'chocolate-lava-cake': {
    youtubeId: 'FbhS7YaGPY4',
    nutrition: { protein: 8, carbs: 44, fat: 32, fiber: 4, sodium: 120 },
    dietTags: ['Naturally Gluten-Free Option', 'Vegetarian', 'Antioxidant Rich'],
    dietNote: 'Dark chocolate (70%+) is one of the richest dietary sources of flavanol antioxidants, shown to reduce blood pressure. Eggs provide lecithin for brain health. Use almond flour instead of regular flour for a gluten-free version with added protein.'
  },
  'pain-au-chocolat': {
    youtubeId: 'ulTCYBMxFyU',
    nutrition: { protein: 7, carbs: 36, fat: 20, fiber: 2, sodium: 290 },
    dietTags: ['Vegetarian', 'Indulgence', 'Breakfast'],
    dietNote: 'The lamination process creates distinct butter layers without the butter being fully incorporated — this is why croissant and pain au chocolat feel lighter than their butter content suggests. Dark chocolate adds antioxidants. A mindful morning indulgence.'
  },
  // ── WESTERN ──
  'pasta-carbonara': {
    youtubeId: 'D_2DBLAt57c',
    nutrition: { protein: 32, carbs: 68, fat: 28, fiber: 3, sodium: 860 },
    dietTags: ['High Protein', 'No Dairy (if Pecorino)', 'Quick Meal'],
    dietNote: 'Eggs provide complete protein and essential B vitamins including choline. Guanciale or pancetta adds flavor-dense fat from the cured pork cheek. The authentic recipe (no cream) is actually lower in saturated fat than cream-based versions. Pasta provides sustained energy.'
  },
  'beef-steak': {
    youtubeId: 'rHe5ajVFpXc',
    nutrition: { protein: 52, carbs: 0, fat: 38, fiber: 0, sodium: 480 },
    dietTags: ['High Protein', 'Keto', 'Zero Carb', 'Iron-Rich', 'Zinc-Rich'],
    dietNote: 'Ribeye provides the most bioavailable iron and zinc of any cut. Conjugated linoleic acid (CLA) in beef fat has documented anti-inflammatory properties. The Maillard crust creates antioxidant compounds. Resting the meat retains 40% more juice than cutting immediately.'
  },
  'caesar-salad': {
    youtubeId: 'YNWjFMNFTXo',
    nutrition: { protein: 22, carbs: 18, fat: 22, fiber: 4, sodium: 680 },
    dietTags: ['High Protein', 'Low Carb', 'Balanced', 'Gluten-Free Option'],
    dietNote: 'Romaine is exceptionally high in vitamins A, K and folate per calorie. Anchovies provide omega-3s, calcium and iodine. Parmesan supplies concentrated protein and calcium. The egg yolk dressing provides choline. Use GF bread for croutons to make fully gluten-free.'
  },
  'fish-chips': {
    youtubeId: 'MqW72fK0lsE',
    nutrition: { protein: 38, carbs: 68, fat: 28, fiber: 5, sodium: 720 },
    dietTags: ['High Protein', 'Omega-3 Rich', 'Dairy-Free'],
    dietNote: 'Cod and haddock are excellent lean protein sources rich in selenium, phosphorus and B12. Beer batter has surprisingly less fat than wet batter because CO2 bubbles create a barrier. Potatoes provide potassium and vitamin C — twice-frying is actually more efficient than once at lower temp.'
  },
  // ── NEW LUXURY ──
  'wagyu-steak': {
    youtubeId: 'rHe5ajVFpXc',
    nutrition: { protein: 44, carbs: 0, fat: 52, fiber: 0, sodium: 280 },
    dietTags: ['Keto', 'Zero Carb', 'High Protein', 'Iron-Rich', 'Ultra Luxury'],
    dietNote: 'A5 Wagyu contains the highest concentration of monounsaturated oleic acid of any beef — the same fat profile as olive oil. Rich in CLA (anti-inflammatory), omega-3s, and B vitamins. The extraordinary marbling means smaller portions satisfy completely. Pure protein and healthy fat.'
  },
  'bouillabaisse': {
    youtubeId: 'MFKBez7Ggys',
    nutrition: { protein: 46, carbs: 18, fat: 22, fiber: 4, sodium: 960 },
    dietTags: ['High Protein', 'Omega-3 Rich', 'Gluten-Free Option', 'Mediterranean', 'Low Carb'],
    dietNote: 'Multiple fish species create an extraordinary amino acid profile. Saffron contains crocin — one of the world\'s most potent antioxidant compounds. Mussels and clams provide outstanding zinc, selenium and iodine. Tomatoes and fennel add lycopene and folate. Quintessential Mediterranean diet.'
  },
};

/* ══════════════════════════════════════
   STATE
══════════════════════════════════════ */
let currentFilter = 'all';
let currentStyleFilter = 'all';
let currentVideoFilter = 'all';
let currentLang = localStorage.getItem(LANG_STORAGE) || 'en';
let displayedCount = 9;
let conversationHistory = [];
let savedRecipes = JSON.parse(localStorage.getItem('culinaryai_saved') || '[]');
let timerInterval = null;
let timerSeconds = 0;
let totalTimerSeconds = 0;
let timerRunning = false;
let originalServes = 4;
let desiredServes = 4;

/* ══════════════════════════════════════
   APP INITIALIZATION
══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Hide splash screen after a short delay
  const splash = document.getElementById('splashScreen');
  if (splash) {
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => {
        splash.style.display = 'none';
      }, 800); // Wait for transition to finish
    }, 2500); // 2.5 second splash duration
  }

  // Set default generic search text on load
  const genericInput = document.getElementById('genericSearchInput');
  if (genericInput) {
    genericInput.value = "Show me luxury recipes";
  }

  renderRecipes();
  renderLuxuryGrid();
  renderBakeryGrid();
  renderMyanmarCards();
  renderSubstitutions('');
  renderVideos('all');
  setupNavScroll();
  setupSearchSuggestions();
  initTimerDisplay();
  animateOnScroll();
  startDemoTypingEffect();
  initOpenAI();
  initLanguage();
  initMealLog();
  initDietPlan();

  if (typeof initCuisines === 'function') initCuisines();
  if (typeof initRecipes === 'function') initRecipes();
  if (typeof initBakery === 'function') initBakery();
  if (typeof initLuxury === 'function') initLuxury();
  if (typeof initVideos === 'function') initVideos();
  if (typeof initTools === 'function') initTools();
  if (typeof initBMREvents === 'function') initBMREvents();
  if (typeof initChatDraggable === 'function') initChatDraggable();
});

/* ══════════════════════════════════════
   NAVIGATION
══════════════════════════════════════ */
function setupNavScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('navLinks').classList.remove('open');
    });
  });
}

/* ══════════════════════════════════════
   BMR / TDEE CALCULATOR
══════════════════════════════════════ */
let bmrSex = 'male';
let bmrActivityFactor = 1.2;

function toggleBMR() {
  const panel = document.getElementById('bmrPanel');
  const arrow = document.getElementById('bmrArrow');
  const open = panel.classList.toggle('open');
  arrow.textContent = open ? '▲' : '▼';
}

function setBMRSex(sex, btn) {
  bmrSex = sex;
  document.querySelectorAll('.bmr-sex-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function setBMRAct(factor, btn) {
  bmrActivityFactor = factor;
  document.querySelectorAll('.bmr-act-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function calculateBMR() {
  const age = parseInt(document.getElementById('bmrAge').value);
  const weight = parseFloat(document.getElementById('bmrWeight').value);
  const height = parseFloat(document.getElementById('bmrHeight').value);
  if (!age || !weight || !height) { showToast('Fill in age, weight and height first.'); return; }

  // Mifflin-St Jeor equation
  const bmr = bmrSex === 'male'
    ? Math.round(10 * weight + 6.25 * height - 5 * age + 5)
    : Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  const tdee = Math.round(bmr * bmrActivityFactor);
  const loss = Math.round(tdee - 500);    // ~0.5 kg/week deficit
  const fastLoss = Math.round(tdee - 750);    // ~0.75 kg/week deficit

  document.getElementById('bmrResult').innerHTML = `
    <div class="bmr-result-grid">
      <div class="bmr-stat">
        <div class="bmr-stat-val">${bmr}</div>
        <div class="bmr-stat-label">BMR<small>Calories at rest</small></div>
      </div>
      <div class="bmr-stat">
        <div class="bmr-stat-val">${tdee}</div>
        <div class="bmr-stat-label">TDEE<small>Daily maintenance</small></div>
      </div>
      <div class="bmr-stat bmr-stat-hl">
        <div class="bmr-stat-val">${loss}</div>
        <div class="bmr-stat-label">Weight Loss<small>~0.5 kg/week</small></div>
      </div>
      <div class="bmr-stat">
        <div class="bmr-stat-val">${fastLoss}</div>
        <div class="bmr-stat-label">Fast Loss<small>~0.75 kg/week</small></div>
      </div>
    </div>
    <button class="bmr-apply-btn" onclick="applyBMRTarget(${loss})">
      ✓ Apply ${loss} kcal to my Diet Plan
    </button>`;
}

function applyBMRTarget(kcal) {
  dietTarget = kcal;
  localStorage.setItem('culinaryai_diet_target', kcal);
  document.querySelectorAll('.cal-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.cal) === kcal);
  });
  showToast(`✅ Calorie target set to ${kcal} kcal — regenerating plan…`);
  generateLocalDietPlan();
}

/* ══════════════════════════════════════
   GROCERY LIST GENERATOR
══════════════════════════════════════ */
let groceryWeek = 1;

const GROCERY_CATS = {
  proteins: { label: '🥩 Proteins & Meat', keys: ['chicken', 'beef', 'pork', 'fish', 'shrimp', 'lamb', 'tofu', 'egg', 'salmon', 'duck', 'turkey', 'paneer', 'lobster', 'tuna'] },
  produce: { label: '🥦 Produce & Vegetables', keys: ['tomato', 'onion', 'garlic', 'ginger', 'potato', 'carrot', 'spinach', 'pepper', 'chili', 'mushroom', 'cucumber', 'broccoli', 'cabbage', 'spring onion', 'lemongrass', 'lime', 'lemon', 'mango', 'banana', 'apple', 'kiwi', 'berr', 'avocado', 'corn', 'celery', 'eggplant'] },
  pantry: { label: '🫙 Pantry & Dry Goods', keys: ['rice', 'noodle', 'flour', 'bread', 'pasta', 'oats', 'lentil', 'chickpea', 'sugar', 'salt', 'oil', 'soy sauce', 'fish sauce', 'oyster', 'vinegar', 'stock', 'broth', 'coconut milk', 'tomato paste', 'sesame', 'can ', 'powder', 'curry paste'] },
  dairy: { label: '🥛 Dairy & Eggs', keys: ['milk', 'cream', 'butter', 'yogurt', 'cheese', 'ghee', 'egg', 'paneer'] },
  herbs: { label: '🌿 Herbs, Spices & Sauces', keys: ['coriander', 'basil', 'mint', 'parsley', 'turmeric', 'cumin', 'paprika', 'cinnamon', 'cardamom', 'chili powder', 'garam masala', 'curry', 'bay', 'thyme', 'oregano', 'rosemary', 'honey', 'sauce', 'paste', 'gochujang', 'miso', 'kimchi', 'peanut'] },
};

function setGroceryWeek(week, btn) {
  groceryWeek = week;
  document.querySelectorAll('.week-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function generateGroceryList() {
  if (!dietPlan.length) { showToast('Generate your diet plan first!'); return; }
  const start = (groceryWeek - 1) * 7;
  const days = dietPlan.slice(start, start + 7);

  // Collect all ingredients from lunch + dinner
  const raw = [];
  days.forEach(d => {
    if (d.lunch?.ingredients) raw.push(...d.lunch.ingredients);
    if (d.dinner?.ingredients) raw.push(...d.dinner.ingredients);
  });

  // Deduplicate by normalised base name
  const seen = new Set();
  const unique = raw.filter(ing => {
    const key = ing.toLowerCase()
      .replace(/^\d+[\w.\/]*\s*(g|kg|ml|l|cup|tbsp|tsp|oz|lb|cloves?|pieces?|bunches?|slices?|cans?|whole|large|small|medium|fresh|dried|chopped|minced|sliced)s?\s*/i, '')
      .split(',')[0].trim().slice(0, 30);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Categorise
  const groups = {};
  Object.keys(GROCERY_CATS).forEach(k => groups[k] = []);
  const misc = [];
  unique.forEach(ing => {
    const lower = ing.toLowerCase();
    let placed = false;
    for (const [cat, meta] of Object.entries(GROCERY_CATS)) {
      if (meta.keys.some(kw => lower.includes(kw))) { groups[cat].push(ing); placed = true; break; }
    }
    if (!placed) misc.push(ing);
  });
  if (misc.length) groups.pantry.push(...misc);

  let html = `
    <div class="grocery-summary">
      <span class="grocery-count">${unique.length} ingredients</span>
      <span class="grocery-week-tag">Week ${groceryWeek} · Days ${start + 1}–${Math.min(start + 7, dietPlan.length)}</span>
      <button class="grocery-copy-btn" onclick="copyGroceryList()">📋 Copy</button>
    </div>
    <div class="grocery-cats" id="groceryCats">`;

  for (const [cat, items] of Object.entries(groups)) {
    if (!items.length) continue;
    const meta = GROCERY_CATS[cat] || { label: '📦 Other' };
    html += `
      <div class="grocery-cat">
        <div class="grocery-cat-hdr">${meta.label}<span class="grocery-cat-count">${items.length}</span></div>
        <div class="grocery-items">
          ${items.map((item, i) => `
            <label class="grocery-item" for="gi-${cat}-${i}">
              <input type="checkbox" id="gi-${cat}-${i}" class="grocery-chk" onchange="this.closest('.grocery-item').classList.toggle('done',this.checked)">
              <span class="grocery-item-txt">${item}</span>
            </label>`).join('')}
        </div>
      </div>`;
  }
  html += '</div>';
  document.getElementById('groceryList').innerHTML = html;
}

function copyGroceryList() {
  const cats = document.querySelectorAll('#groceryCats .grocery-cat');
  let text = `🛒 Grocery List — Week ${groceryWeek}\n\n`;
  cats.forEach(cat => {
    const hdr = cat.querySelector('.grocery-cat-hdr')?.textContent?.replace(/\d+$/, '').trim() || '';
    const items = [...cat.querySelectorAll('.grocery-item-txt')].map(el => `• ${el.textContent}`);
    text += `${hdr}\n${items.join('\n')}\n\n`;
  });
  navigator.clipboard.writeText(text).then(() => showToast('📋 Grocery list copied!'));
}

/* ══════════════════════════════════════
   SAVED MEAL LOGGER
══════════════════════════════════════ */
let mealLog = {};   // { dayNum: { breakfast, lunch, snack, dinner } }

function initMealLog() {
  const stored = localStorage.getItem('culinaryai_meal_log');
  if (stored) { try { mealLog = JSON.parse(stored); } catch (_) { mealLog = {}; } }
}

function saveMealLog() {
  localStorage.setItem('culinaryai_meal_log', JSON.stringify(mealLog));
}

function toggleMealLog(dayNum, meal) {
  if (!mealLog[dayNum]) mealLog[dayNum] = { breakfast: false, lunch: false, snack: false, dinner: false };
  mealLog[dayNum][meal] = !mealLog[dayNum][meal];
  saveMealLog();
  const btn = document.getElementById(`log-${dayNum}-${meal}`);
  if (btn) btn.classList.toggle('logged', mealLog[dayNum][meal]);
  renderAdherencePanel();
}

function getMealLogForDay(dayNum) {
  return mealLog[dayNum] || { breakfast: false, lunch: false, snack: false, dinner: false };
}

function renderAdherencePanel() {
  const panel = document.getElementById('adherencePanel');
  if (!panel) return;

  // Streak: consecutive full days from day 1
  let streak = 0;
  for (let i = 1; i <= 30; i++) {
    const log = mealLog[i];
    if (log && log.breakfast && log.lunch && log.snack && log.dinner) streak++;
    else break;
  }

  const totalMeals = Object.values(mealLog).reduce((sum, d) => {
    return sum + [d.breakfast, d.lunch, d.snack, d.dinner].filter(Boolean).length;
  }, 0);

  if (totalMeals === 0 && streak === 0) { panel.innerHTML = ''; return; }

  const dayDots = Array.from({ length: 30 }, (_, i) => {
    const log = mealLog[i + 1] || {};
    const eaten = [log.breakfast, log.lunch, log.snack, log.dinner].filter(Boolean).length;
    const color = eaten === 4 ? '#06D6A0' : eaten >= 2 ? '#FFB703' : eaten > 0 ? '#FB8500' : 'rgba(255,255,255,0.1)';
    const day = dietPlan[i];
    const label = day ? day.date : `Day ${i + 1}`;
    return `<div class="adh-dot" title="${label}: ${eaten}/4 meals" style="background:${color}">${eaten > 0 ? eaten : ''}</div>`;
  }).join('');

  panel.innerHTML = `
    <div class="adh-header">
      <div class="adh-title">📈 Meal Adherence Tracker</div>
      <div class="adh-stats">
        <div class="adh-stat"><span class="adh-stat-val" style="color:#06D6A0">${streak}🔥</span><span class="adh-stat-lbl">Day Streak</span></div>
        <div class="adh-stat"><span class="adh-stat-val">${totalMeals}</span><span class="adh-stat-lbl">Meals Logged</span></div>
        <div class="adh-stat"><span class="adh-stat-val">${Math.round((totalMeals / 120) * 100)}%</span><span class="adh-stat-lbl">30-Day Progress</span></div>
      </div>
    </div>
    <div class="adh-legend">
      <span class="adh-leg"><span class="adh-leg-dot" style="background:#06D6A0"></span>All 4</span>
      <span class="adh-leg"><span class="adh-leg-dot" style="background:#FFB703"></span>2–3</span>
      <span class="adh-leg"><span class="adh-leg-dot" style="background:#FB8500"></span>1</span>
      <span class="adh-leg"><span class="adh-leg-dot" style="background:rgba(255,255,255,0.1)"></span>None</span>
    </div>
    <div class="adh-grid">${dayDots}</div>`;
}

/* ══════════════════════════════════════
   30-DAY AI PERSONALISED DIET PLAN
══════════════════════════════════════ */

const DIET_TYPE_META = {
  balanced: { label: 'Balanced', emoji: '🌿', desc: 'Varied, nutritionally complete meals' },
  keto: { label: 'Keto', emoji: '🥑', desc: 'High fat, very low carb (<30g/day)' },
  'high-protein': { label: 'High-Protein', emoji: '💪', desc: 'Extra protein for muscle & satiety' },
  mediterranean: { label: 'Mediterranean', emoji: '🫒', desc: 'Heart-healthy, rich in fish & olive oil' },
  'low-carb': { label: 'Low-Carb', emoji: '🥗', desc: 'Reduced carbs for steady energy' },
  vegan: { label: 'Vegan', emoji: '🌱', desc: 'Entirely plant-based meals' },
};

// Diet type → qualifying RECIPE_EXTRAS dietTags (null = all recipes)
const DIET_TAG_FILTER = {
  balanced: null,
  keto: ['Keto', 'Keto-Friendly', 'Low Carb', 'Gluten-Free'],
  'high-protein': ['High Protein', 'Iron-Rich'],
  mediterranean: ['Omega-3 Rich', 'Heart-Healthy', 'Plant Protein', 'Balanced', 'Fresh Herbs', 'Low Fat'],
  'low-carb': ['Low Carb', 'Keto', 'Keto-Friendly', 'Gluten-Free', 'Low Calorie'],
  vegan: ['Vegetarian', 'Vegan Option', 'Plant Protein', 'Probiotic Rich', 'Antioxidant Powerhouse'],
};

// Per-diet breakfast pools
const DIET_BREAKFASTS = {
  balanced: [
    { name: 'Greek Yogurt + Berries + Honey', cal: 180, emoji: '🥣', macro: '18g protein · 24g carbs · 3g fat', tip: 'Add chia seeds for omega-3 boost' },
    { name: 'Oatmeal + Banana + Almond Butter', cal: 310, emoji: '🌾', macro: '9g protein · 52g carbs · 9g fat', tip: 'Rolled oats have lower GI than instant' },
    { name: 'Scrambled Eggs + Avocado Toast', cal: 340, emoji: '🥑', macro: '16g protein · 28g carbs · 18g fat', tip: 'Avocado provides satiety-boosting healthy fats' },
    { name: 'Smoothie: Spinach + Banana + Protein', cal: 280, emoji: '🥤', macro: '22g protein · 36g carbs · 5g fat', tip: 'Blend cold — preserves vitamins better' },
    { name: 'Overnight Oats + Chia + Mango', cal: 290, emoji: '🥛', macro: '12g protein · 44g carbs · 7g fat', tip: 'Prep night before for zero morning effort' },
    { name: 'Boiled Eggs + Whole Grain Toast', cal: 240, emoji: '🥚', macro: '18g protein · 26g carbs · 8g fat', tip: 'Hard-boiled eggs are perfect portable protein' },
    { name: 'Miso Soup + Steamed Rice + Pickles', cal: 200, emoji: '🍵', macro: '8g protein · 36g carbs · 2g fat', tip: 'Fermented miso supports gut microbiome' },
    { name: 'Cottage Cheese + Pineapple', cal: 180, emoji: '🍍', macro: '20g protein · 18g carbs · 3g fat', tip: 'Cottage cheese is exceptionally high in casein protein' },
    { name: 'Veggie Omelette (3 eggs)', cal: 260, emoji: '🍳', macro: '21g protein · 6g carbs · 17g fat', tip: 'Add turmeric for anti-inflammatory benefits' },
    { name: 'Açaí Bowl + Granola + Kiwi', cal: 320, emoji: '🫐', macro: '7g protein · 54g carbs · 9g fat', tip: 'Açaí is one of the highest antioxidant foods' },
    { name: 'Whole Grain Pancakes + Blueberries', cal: 300, emoji: '🥞', macro: '10g protein · 48g carbs · 7g fat', tip: 'Blueberries are cognitive-function powerhouses' },
    { name: 'Smoked Salmon + Cream Cheese Bagel', cal: 360, emoji: '🐟', macro: '22g protein · 38g carbs · 12g fat', tip: 'Salmon provides omega-3 for heart and brain health' },
    { name: 'Green Smoothie: Kale + Apple + Ginger', cal: 180, emoji: '🥬', macro: '5g protein · 36g carbs · 1g fat', tip: 'Ginger in the morning aids digestion all day' },
    { name: 'Rice Congee + Soft-boiled Egg', cal: 220, emoji: '🍚', macro: '10g protein · 38g carbs · 3g fat', tip: 'Congee is extremely easy on digestion — ideal reset meal' },
  ],
  keto: [
    { name: 'Bulletproof Coffee + Coconut Oil', cal: 230, emoji: '☕', macro: '1g protein · 1g carbs · 26g fat', tip: 'MCTs from coconut oil provide rapid brain fuel' },
    { name: 'Bacon + 3 Scrambled Eggs + Avocado', cal: 520, emoji: '🥑', macro: '32g protein · 5g carbs · 42g fat', tip: 'High-fat breakfast suppresses hunger for 5+ hours on keto' },
    { name: 'Chia Pudding (coconut milk)', cal: 310, emoji: '🥥', macro: '8g protein · 10g carbs · 28g fat', tip: 'Chia seeds provide omega-3 ALA and keep you full' },
    { name: 'Smoked Salmon + Cream Cheese + Cucumber', cal: 280, emoji: '🐟', macro: '22g protein · 4g carbs · 20g fat', tip: 'Salmon is the ideal keto protein — rich in omega-3' },
    { name: 'Keto Egg Muffins with Cheese + Spinach', cal: 290, emoji: '🍳', macro: '24g protein · 3g carbs · 20g fat', tip: 'Batch cook Sunday — eat all week without carbs' },
    { name: 'Full-Fat Greek Yogurt + Walnuts', cal: 260, emoji: '🥛', macro: '14g protein · 8g carbs · 20g fat', tip: 'Walnuts are the highest omega-3 nut — great for keto' },
    { name: 'Almond Flour Pancakes + Butter', cal: 350, emoji: '🥞', macro: '16g protein · 6g carbs · 30g fat', tip: 'Almond flour has 1/6th the carbs of wheat flour' },
  ],
  'high-protein': [
    { name: 'Protein Shake + Banana + Peanut Butter', cal: 380, emoji: '💪', macro: '40g protein · 38g carbs · 12g fat', tip: 'Post-workout ideal — protein synthesis peaks within 30 min' },
    { name: 'Scrambled Eggs (4) + Turkey Breast', cal: 420, emoji: '🥚', macro: '48g protein · 4g carbs · 22g fat', tip: 'Turkey breast is one of the leanest complete proteins' },
    { name: 'Greek Yogurt + Whey Protein + Berries', cal: 320, emoji: '🥣', macro: '42g protein · 26g carbs · 4g fat', tip: 'Casein + whey combo provides slow and fast protein release' },
    { name: 'Smoked Salmon + 3 Eggs Omelette', cal: 440, emoji: '🐟', macro: '46g protein · 4g carbs · 28g fat', tip: 'Combining fish + eggs maximises complete amino acid profile' },
    { name: 'Cottage Cheese + Flaxseeds + Almonds', cal: 290, emoji: '🍍', macro: '32g protein · 14g carbs · 14g fat', tip: 'Cottage cheese has the highest casein content per calorie' },
    { name: 'Chicken Breast + Quinoa Bowl', cal: 410, emoji: '🍗', macro: '44g protein · 38g carbs · 8g fat', tip: 'Quinoa is the only grain with all essential amino acids' },
    { name: 'High-Protein Oatmeal + 2 Egg Whites', cal: 340, emoji: '🌾', macro: '36g protein · 44g carbs · 6g fat', tip: 'Stir egg whites into hot oatmeal — they set without scrambling' },
  ],
  mediterranean: [
    { name: 'Whole Grain Toast + Olive Oil + Tomatoes', cal: 220, emoji: '🫒', macro: '6g protein · 32g carbs · 9g fat', tip: 'Extra virgin olive oil is most potent for anti-inflammation' },
    { name: 'Greek Yogurt + Walnuts + Honey + Fig', cal: 280, emoji: '🥛', macro: '14g protein · 36g carbs · 10g fat', tip: 'Walnuts are the most Mediterranean nut — rich in omega-3' },
    { name: 'Shakshuka (2 eggs in tomato sauce)', cal: 300, emoji: '🍳', macro: '18g protein · 22g carbs · 16g fat', tip: 'Tomatoes cooked in olive oil dramatically boost lycopene absorption' },
    { name: 'Smoked Salmon + Whole Grain Pita', cal: 320, emoji: '🐟', macro: '26g protein · 32g carbs · 10g fat', tip: 'The Mediterranean diet scores highest for cardiovascular health' },
    { name: 'Feta + Cucumber + Olives + Egg', cal: 260, emoji: '🫙', macro: '16g protein · 8g carbs · 18g fat', tip: 'Feta is lower in fat than most cheeses and provides calcium' },
    { name: 'Overnight Oats + Almond Milk + Dates', cal: 290, emoji: '🌾', macro: '10g protein · 48g carbs · 7g fat', tip: 'Dates are a traditional Mediterranean natural sweetener' },
    { name: 'Vegetable Frittata + Fresh Herbs', cal: 270, emoji: '🥚', macro: '20g protein · 10g carbs · 18g fat', tip: 'Fresh herbs (basil, oregano, parsley) reduce inflammation' },
  ],
  'low-carb': [
    { name: 'Scrambled Eggs + Spinach + Cheese', cal: 280, emoji: '🥚', macro: '22g protein · 4g carbs · 20g fat', tip: 'Starting low-carb keeps blood sugar stable all morning' },
    { name: 'Smoked Salmon + Avocado + Cream Cheese', cal: 330, emoji: '🐟', macro: '24g protein · 5g carbs · 24g fat', tip: 'Fat + protein together delays hunger by slowing digestion' },
    { name: 'Greek Yogurt (full-fat) + Almonds', cal: 240, emoji: '🥛', macro: '16g protein · 10g carbs · 16g fat', tip: 'Full-fat dairy has lower glycemic impact than low-fat versions' },
    { name: 'Vegetable Omelette + Feta', cal: 270, emoji: '🍳', macro: '20g protein · 6g carbs · 18g fat', tip: 'Omelettes are the original low-carb fast food — ready in 5 min' },
    { name: 'Chia Pudding (almond milk) + Berries', cal: 210, emoji: '🫐', macro: '10g protein · 14g carbs · 12g fat', tip: 'Berries have the lowest sugar content of any fruit' },
    { name: 'Turkey Lettuce Wraps + Hummus', cal: 220, emoji: '🥬', macro: '24g protein · 8g carbs · 10g fat', tip: 'Lettuce wraps eliminate carb-heavy bread without sacrificing satisfaction' },
  ],
  vegan: [
    { name: 'Oatmeal + Plant Protein + Banana', cal: 310, emoji: '🌾', macro: '22g protein · 52g carbs · 6g fat', tip: 'Plant protein powder bridges the amino acid gap in oats' },
    { name: 'Tofu Scramble + Bell Peppers + Turmeric', cal: 240, emoji: '⬜', macro: '18g protein · 16g carbs · 12g fat', tip: 'Turmeric + black pepper activates curcumin absorption by 2000%' },
    { name: 'Açaí Bowl + Granola + Hemp Seeds', cal: 340, emoji: '🫐', macro: '12g protein · 54g carbs · 12g fat', tip: 'Hemp seeds contain all 9 essential amino acids — rare for plants' },
    { name: 'Smoothie: Spinach + Pea Protein + Mango', cal: 280, emoji: '🥤', macro: '26g protein · 38g carbs · 4g fat', tip: 'Pea protein is the most digestible plant protein' },
    { name: 'Avocado Toast + Sunflower Seeds', cal: 320, emoji: '🥑', macro: '10g protein · 32g carbs · 18g fat', tip: 'Sunflower seeds provide vitamin E and selenium for immune support' },
    { name: 'Overnight Oats (soy milk) + Chia + Kiwi', cal: 290, emoji: '🥛', macro: '14g protein · 46g carbs · 8g fat', tip: 'Soy milk has the highest protein of all plant milks' },
    { name: 'Whole Grain Toast + Almond Butter + Banana', cal: 330, emoji: '🌰', macro: '12g protein · 48g carbs · 12g fat', tip: 'Almonds and bananas together provide a near-complete amino profile' },
  ],
};

const DAILY_TIPS = [
  'Drink 500ml of water before each meal — it naturally reduces portion size by 13%.',
  'Eat your vegetables first — fiber fills you up and slows glucose absorption.',
  'Chew each bite 20 times. This gives satiety hormones time to signal your brain.',
  'Stop eating 3 hours before bed. Digestion rate slows significantly during sleep.',
  'Protein at every meal. It has the highest thermic effect — burns 20-30% of its calories in digestion.',
  'Plan tomorrow\'s meals tonight. People who plan eat 400 fewer calories per day on average.',
  'Walk 10 minutes after lunch. It lowers post-meal blood sugar by up to 22%.',
  'Sleep 7-8 hours. Sleep deprivation raises ghrelin (hunger hormone) by 14% the next day.',
  'Eat slowly — it takes 20 minutes for your gut to signal fullness to your brain.',
  'Use smaller plates. Portion perception is 20-30% of satiety — your brain is fooled.',
  'Snack on protein not carbs. It prevents the insulin spike that triggers afternoon cravings.',
  'Meal prep on Sunday. Prepared meals result in better choices 90% of the time.',
  'Track your calories for 3 days. Awareness alone reduces intake by an average of 300 kcal.',
  'Eat mindfully — no phone or TV while eating. It reduces intake by up to 18%.',
  'One rest day per week. Sustainable plans beat intense short-term ones every time.',
];

let dietTarget = 1500;
let currentDietType = 'balanced';
let dietPlan = [];

function initDietPlan() {
  const storedType = localStorage.getItem('culinaryai_diet_type');
  const storedTarget = localStorage.getItem('culinaryai_diet_target');
  const stored = localStorage.getItem('culinaryai_diet_plan');

  if (storedType) {
    currentDietType = storedType;
    document.querySelectorAll('.diet-type-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.diet === currentDietType);
    });
  }
  if (storedTarget) {
    dietTarget = parseInt(storedTarget);
    document.querySelectorAll('.cal-btn').forEach(b => {
      b.classList.toggle('active', parseInt(b.dataset.cal) === dietTarget);
    });
  }
  if (stored) {
    try {
      dietPlan = JSON.parse(stored);
      renderDietPlan();
      return;
    } catch (_) { }
  }
  generateLocalDietPlan();
}

function setDietType(type, btn) {
  currentDietType = type;
  localStorage.setItem('culinaryai_diet_type', type);
  document.querySelectorAll('.diet-type-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  generateLocalDietPlan();
}

function setCalTarget(cal, btn) {
  dietTarget = cal;
  localStorage.setItem('culinaryai_diet_target', cal);
  document.querySelectorAll('.cal-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

function getDietRecipePool() {
  const tags = DIET_TAG_FILTER[currentDietType];
  if (!tags) return [...RECIPES];
  const filtered = RECIPES.filter(r => {
    const extras = RECIPE_EXTRAS[r.id];
    if (!extras || !extras.dietTags) return false;
    return extras.dietTags.some(t => tags.some(ft => t.toLowerCase().includes(ft.toLowerCase())));
  });
  // Fall back to all recipes if filter yields fewer than 6 results
  return filtered.length >= 6 ? filtered : [...RECIPES];
}

function generateLocalDietPlan() {
  const today = new Date();
  const pool = getDietRecipePool();
  const lunchPool = [...pool].sort((a, b) => a.calories - b.calories);
  const dinnerPool = [...pool].sort(() => Math.random() - 0.5);
  const breakfasts = DIET_BREAKFASTS[currentDietType] || DIET_BREAKFASTS.balanced;
  const snackIdeas = [
    { name: 'Apple + Almond Butter', cal: 160, emoji: '🍎' },
    { name: 'Handful of Mixed Nuts', cal: 180, emoji: '🥜' },
    { name: 'Carrot Sticks + Hummus', cal: 120, emoji: '🥕' },
    { name: 'Banana + Protein Shake', cal: 210, emoji: '🍌' },
    { name: 'Rice Cake + Avocado', cal: 140, emoji: '🥑' },
  ];

  dietPlan = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const breakfast = breakfasts[i % breakfasts.length];
    const lunch = lunchPool[i % lunchPool.length];
    const dinner = dinnerPool[(i + 7) % dinnerPool.length];
    const snack = snackIdeas[i % snackIdeas.length];
    const total = breakfast.cal + lunch.calories + dinner.calories + snack.cal;
    const tip = DAILY_TIPS[i % DAILY_TIPS.length];
    return { day: i + 1, date: dateStr, breakfast, lunch, dinner, snack, total, tip };
  });

  localStorage.setItem('culinaryai_diet_plan', JSON.stringify(dietPlan));
  renderDietPlan();
  const meta = DIET_TYPE_META[currentDietType];
  showToast(`✅ 30-day ${meta.label} diet plan generated!`);
}

async function generateAIDietPlan() {
  const btn = document.getElementById('genPlanBtn');
  if (!btn) return;
  btn.disabled = true;
  btn.innerHTML = '<span style="display:inline-block;animation:spin 1s linear infinite">⟳</span> Generating with AI…';

  try {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const meta = DIET_TYPE_META[currentDietType];
    const pool = getDietRecipePool();
    const recipeNames = pool.map(r => `${r.name} (id:${r.id}, ${r.calories}kcal)`).join(', ');
    const messages = [{
      role: 'user',
      content: `You are a registered dietitian creating a ${dietTarget} calorie/day 30-day ${meta.label} diet plan starting ${today}.
Diet type: ${meta.label} — ${meta.desc}.
Available recipes: ${recipeNames}.
Return ONLY a valid JSON array of exactly 30 objects with this schema (no other text):
[{"day":1,"date":"Mon, Mar 3","lunchId":"pad-thai","dinnerId":"tom-yum","tip":"One actionable diet tip under 12 words"}]
Use recipe IDs exactly as shown. Vary cuisines. Optimise strictly for the ${meta.label} diet type and ${dietTarget} kcal target.`
    }];
    // Use raw call (2500 tokens) — 30-day JSON needs more room than chat's 600
    const aiText = await callOpenAIRaw(messages, 2500);
    const jsonMatch = aiText.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const aiDays = JSON.parse(jsonMatch[0]);
      const today2 = new Date();
      const breakfasts = DIET_BREAKFASTS[currentDietType] || DIET_BREAKFASTS.balanced;
      dietPlan = aiDays.slice(0, 30).map((d, i) => {
        const lunch = pool.find(r => r.id === d.lunchId) || pool[i % pool.length];
        const dinner = pool.find(r => r.id === d.dinnerId) || pool[(i + 5) % pool.length];
        const breakfast = breakfasts[i % breakfasts.length];
        const snack = { name: 'Fruit + Nuts', cal: 160, emoji: '🍎' };
        const date2 = new Date(today2); date2.setDate(today2.getDate() + i);
        return {
          day: i + 1,
          date: date2.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          breakfast, lunch, dinner, snack,
          total: breakfast.cal + lunch.calories + dinner.calories + snack.cal,
          tip: d.tip || DAILY_TIPS[i % DAILY_TIPS.length],
          aiGenerated: true,
        };
      });
      localStorage.setItem('culinaryai_diet_plan', JSON.stringify(dietPlan));
      renderDietPlan();
      showToast(`✨ AI-optimised ${meta.label} diet plan ready!`);
    } else {
      throw new Error('No JSON in response');
    }
  } catch (err) {
    showToast('AI plan failed — generating smart local plan instead');
    generateLocalDietPlan();
  }

  btn.disabled = false;
  btn.innerHTML = '<span>✨</span> Regenerate Diet Plan';
}

function renderDietPlan() {
  const grid = document.getElementById('mealPlanGrid');
  if (!grid || !dietPlan.length) return;

  grid.innerHTML = dietPlan.map(d => {
    const isToday = d.day === 1;
    const calBar = Math.min((d.total / dietTarget) * 100, 120);
    const calColor = d.total <= dietTarget ? '#06D6A0' : d.total <= dietTarget * 1.1 ? '#FFB703' : '#E63946';
    return `
    <div class="meal-day-card ${isToday ? 'meal-day-today' : ''}">
      <div class="meal-day-header">
        <div class="meal-day-num">Day ${d.day}</div>
        <div class="meal-day-date">${d.date}</div>
        ${isToday ? '<div class="meal-today-badge">TODAY</div>' : ''}
        ${d.aiGenerated ? '<div class="meal-ai-badge">✨ AI</div>' : ''}
      </div>

      <!-- Breakfast -->
      <div class="meal-row">
        <div class="meal-row-label">🌅 Breakfast</div>
        <div class="meal-row-content">
          <span class="meal-emoji">${d.breakfast.emoji}</span>
          <div class="meal-text">
            <div class="meal-name">${d.breakfast.name}</div>
            <div class="meal-macro">${d.breakfast.macro || ''}</div>
          </div>
          <div class="meal-cal">${d.breakfast.cal}</div>
        </div>
      </div>

      <!-- Lunch -->
      <div class="meal-row" onclick="openRecipe('${d.lunch.id}')" style="cursor:pointer">
        <div class="meal-row-label">☀️ Lunch</div>
        <div class="meal-row-content">
          <span class="meal-emoji">${d.lunch.emoji}</span>
          <div class="meal-text">
            <div class="meal-name">${d.lunch.name}</div>
            <div class="meal-macro">${d.lunch.cuisine.charAt(0).toUpperCase() + d.lunch.cuisine.slice(1)} · ${d.lunch.cookStyle || ''} · ${d.lunch.difficulty}</div>
          </div>
          <div class="meal-cal">${d.lunch.calories}</div>
        </div>
      </div>

      <!-- Snack -->
      <div class="meal-row">
        <div class="meal-row-label">🍎 Snack</div>
        <div class="meal-row-content">
          <span class="meal-emoji">${d.snack.emoji}</span>
          <div class="meal-text"><div class="meal-name">${d.snack.name}</div></div>
          <div class="meal-cal">${d.snack.cal}</div>
        </div>
      </div>

      <!-- Dinner -->
      <div class="meal-row" onclick="openRecipe('${d.dinner.id}')" style="cursor:pointer">
        <div class="meal-row-label">🌙 Dinner</div>
        <div class="meal-row-content">
          <span class="meal-emoji">${d.dinner.emoji}</span>
          <div class="meal-text">
            <div class="meal-name">${d.dinner.name}</div>
            <div class="meal-macro">${d.dinner.cuisine.charAt(0).toUpperCase() + d.dinner.cuisine.slice(1)} · ~${d.dinner.calories} kcal</div>
          </div>
          <div class="meal-cal">${d.dinner.calories}</div>
        </div>
      </div>

      <!-- Daily total -->
      <div class="meal-total-row">
        <div class="meal-total-bar-wrap">
          <div class="meal-total-bar" style="width:${Math.min(calBar, 100)}%;background:${calColor}"></div>
          ${calBar > 100 ? `<div class="meal-over-bar" style="width:${Math.min(calBar - 100, 20)}%"></div>` : ''}
        </div>
        <div class="meal-total-nums">
          <span style="color:${calColor};font-weight:700">${d.total} kcal</span>
          <span style="color:var(--text-muted);font-size:0.75rem">/ ${dietTarget} target</span>
        </div>
      </div>

      <!-- Daily tip -->
      <div class="meal-day-tip">💡 ${d.tip}</div>

      <!-- Meal Logger -->
      <div class="meal-log-row">
        <span class="meal-log-label">Log eaten:</span>
        ${['breakfast', 'lunch', 'snack', 'dinner'].map(meal => {
      const icons = { breakfast: '🌅', lunch: '☀️', snack: '🍎', dinner: '🌙' };
      const logged = getMealLogForDay(d.day)[meal];
      return `<button id="log-${d.day}-${meal}" class="log-meal-btn${logged ? ' logged' : ''}" onclick="toggleMealLog(${d.day},'${meal}')" title="${meal.charAt(0).toUpperCase() + meal.slice(1)}">${icons[meal]}</button>`;
    }).join('')}
      </div>
    </div>`;
  }).join('');
  renderAdherencePanel();
}

/* ══════════════════════════════════════
   YOUTUBE ERROR LISTENER
   Handles unavailable video fallback
══════════════════════════════════════ */
window.addEventListener('message', (e) => {
  if (!e.origin.includes('youtube')) return;
  try {
    const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
    // YouTube player error codes: 2=bad ID, 5=HTML5 error, 100=not found, 101/150=embed blocked
    if (data.event === 'onError' && [2, 5, 100, 101, 150].includes(data.info)) {
      const iframes = document.querySelectorAll('iframe[data-search]');
      iframes.forEach(iframe => {
        if (iframe.contentWindow === e.source) {
          const searchQuery = iframe.dataset.search || 'cooking recipe';
          const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
          const fallback = document.createElement('div');
          fallback.className = 'yt-fallback';
          fallback.innerHTML = `
            <div class="yt-fallback-inner">
              <div class="yt-fallback-icon">📺</div>
              <p>Video unavailable in embed mode</p>
              <a href="${searchUrl}" target="_blank" rel="noopener" class="yt-fallback-btn">
                🔍 Find on YouTube →
              </a>
            </div>`;
          iframe.parentNode.replaceChild(fallback, iframe);
        }
      });
    }
  } catch (_) { }
});

/* ══════════════════════════════════════
   MULTI-LANGUAGE
══════════════════════════════════════ */
function initLanguage() {
  setLanguage(currentLang, false);
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = getLangFlag(currentLang);
}

function getLangFlag(lang) {
  const flags = { en: '🇺🇸', mm: '🇲🇲', ko: '🇰🇷', zh: '🇨🇳', th: '🇹🇭', vi: '🇻🇳', hi: '🇮🇳', ja: '🇯🇵' };
  return flags[lang] || '🌐';
}

function toggleLangMenu() {
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.toggle('open');
}

function setLanguage(lang, save = true) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  currentLang = lang;
  if (save) localStorage.setItem(LANG_STORAGE, lang);

  // Update all tagged elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  // Update language button flag
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = getLangFlag(lang);

  // Close menu
  const menu = document.getElementById('langMenu');
  if (menu) menu.classList.remove('open');
}

/* ══════════════════════════════════════
   SEARCH
══════════════════════════════════════ */
function setupSearchSuggestions() {
  const input = document.getElementById('heroSearch');
  const box = document.getElementById('searchSuggestions');
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { box.classList.remove('active'); return; }
    const matches = RECIPES.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.tags.some(t => t.includes(q)) ||
      r.cuisine.includes(q)
    ).slice(0, 5);
    if (!matches.length) { box.classList.remove('active'); return; }
    box.innerHTML = matches.map(r => `
      <div class="suggestion-item" onclick="openRecipe('${r.id}')">
        <span>${r.emoji}</span>
        <span>${r.name}</span>
        <span style="margin-left:auto;font-size:0.75rem;color:var(--text-muted)">${r.cuisine}</span>
      </div>`).join('');
    box.classList.add('active');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.hero-search-wrapper')) box.classList.remove('active');
  });
}

function performSearch() {
  const q = document.getElementById('heroSearch').value.toLowerCase().trim();
  if (!q) return;
  document.getElementById('searchSuggestions').classList.remove('active');
  const match = RECIPES.find(r =>
    r.name.toLowerCase().includes(q) ||
    r.tags.some(t => t.includes(q))
  );
  if (match) {
    openRecipe(match.id);
  } else {
    document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' });
    filterRecipes('all', document.querySelector('.filter-btn'));
    showToast(`Showing all recipes — searching for "${q}"`);
  }
}

function quickSearch(term) {
  document.getElementById('heroSearch').value = term;
  performSearch();
}

/* ══════════════════════════════════════
   RECIPE RENDERING
══════════════════════════════════════ */
function getCuisineColor(cuisine) {
  const colors = {
    indian: 'linear-gradient(135deg, #FF6B35, #F7931E)',
    chinese: 'linear-gradient(135deg, #C1292E, #E63946)',
    thai: 'linear-gradient(135deg, #06B6D4, #0891B2)',
    vietnamese: 'linear-gradient(135deg, #10B981, #059669)',
    myanmar: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
    bakery: 'linear-gradient(135deg, #F59E0B, #D97706)',
    luxury: 'linear-gradient(135deg, #2D1B69, #4C1D95)',
    western: 'linear-gradient(135deg, #EC4899, #BE185D)',
  };
  return colors[cuisine] || 'linear-gradient(135deg, #374151, #1F2937)';
}

function renderRecipes() {
  const grid = document.getElementById('recipesGrid');
  let filtered = RECIPES;
  if (currentFilter !== 'all') filtered = filtered.filter(r => r.cuisine === currentFilter);
  if (currentStyleFilter !== 'all') filtered = filtered.filter(r => r.cookStyle === currentStyleFilter);
  const visible = filtered.slice(0, displayedCount);
  grid.innerHTML = visible.map(r => recipeCard(r)).join('');
  document.getElementById('loadMoreBtn').style.display = filtered.length > displayedCount ? 'inline-flex' : 'none';
}

/* ── Ingredient → Emoji map ── */
const INGREDIENT_EMOJI = {
  chicken: '🍗', beef: '🥩', pork: '🥩', lamb: '🍖', fish: '🐟', salmon: '🐟', tuna: '🐟', catfish: '🐟',
  shrimp: '🍤', prawn: '🍤', lobster: '🦞', duck: '🦆', crab: '🦀',
  tofu: '⬜', paneer: '🧀', egg: '🥚', eggs: '🥚',
  rice: '🍚', noodles: '🍜', pasta: '🍝', bread: '🍞', flour: '🌾', dough: '🫓', croissant: '🥐',
  vermicelli: '🍜', tteok: '🍡',
  tomato: '🍅', onion: '🧅', garlic: '🧄', ginger: '🌿', potato: '🥔', carrot: '🥕',
  spinach: '🥬', mushroom: '🍄', pepper: '🌶️', chili: '🌶️', cucumber: '🥒',
  broccoli: '🥦', zucchini: '🥒', leek: '🌿', eggplant: '🍆', corn: '🌽',
  celery: '🌿', avocado: '🥑', kimchi: '🥬', banana: '🍌',
  lemon: '🍋', lime: '🍋', orange: '🍊', apple: '🍎', pear: '🍐', mango: '🥭', coconut: '🥥',
  butter: '🧈', cream: '🥛', milk: '🥛', yogurt: '🥛', cheese: '🧀', ghee: '🧈',
  soy: '🫙', sauce: '🫙', oil: '🫙', vinegar: '🫙', paste: '🫙', gochujang: '🌶️', doubanjiang: '🌶️',
  coriander: '🌿', mint: '🌿', basil: '🌿', thyme: '🌿', parsley: '🌿', herb: '🌿',
  turmeric: '🟡', cumin: '🟤', cinnamon: '🟤', saffron: '✨', star: '⭐', cardamom: '🌿',
  salt: '🧂', sugar: '🍬', honey: '🍯',
  peanuts: '🥜', sesame: '🌰', nuts: '🥜', almond: '🥜',
  tea: '🍵', coffee: '☕', water: '💧', broth: '🥣', stock: '🥣', wine: '🍷',
  prosciutto: '🥩', truffle: '🍄', chocolate: '🍫',
};

function getIngEmoji(str) {
  const lower = str.toLowerCase();
  for (const [k, e] of Object.entries(INGREDIENT_EMOJI)) {
    if (lower.includes(k)) return e;
  }
  return '🫙';
}

const COOK_STYLE_META = {
  'quick': { label: 'Quick', emoji: '⚡' },
  'one-pan': { label: 'One-Pan', emoji: '🍳' },
  'stir-fry': { label: 'Stir-Fry', emoji: '🥢' },
  'grilled': { label: 'Grilled', emoji: '🔥' },
  'no-cook': { label: 'No-Cook', emoji: '🥗' },
  'baked': { label: 'Baked', emoji: '🫓' },
  'slow-cooked': { label: 'Slow-Cooked', emoji: '🫕' },
  'steamed': { label: 'Steamed', emoji: '🥟' },
  'deep-fried': { label: 'Deep-Fried', emoji: '🍟' },
};

function recipeCard(r) {
  const saved = savedRecipes.includes(r.id);
  const extras = RECIPE_EXTRAS[r.id] || {};
  const nutrition = extras.nutrition;
  const dietTags = extras.dietTags || [];
  const youtubeId = extras.youtubeId;
  const styleMeta = r.cookStyle ? COOK_STYLE_META[r.cookStyle] : null;
  const photoStyle = r.photo
    ? `background: url('${r.photo}') center/cover no-repeat;`
    : `background: ${r.color};`;

  // Calorie-based diet indicator
  const calLevel = r.calories < 250 ? { label: 'Light', color: '#06D6A0' }
    : r.calories < 450 ? { label: 'Moderate', color: '#FFB703' }
      : { label: 'Rich', color: '#FF6B35' };

  return `
    <div class="recipe-card" onclick="openRecipe('${r.id}')">
      <div class="recipe-card-img" style="${photoStyle}">
        ${!r.photo ? `<div class="recipe-emoji-display">${r.emoji}</div>` : ''}
        ${styleMeta ? `<div class="cook-style-badge">${styleMeta.emoji} ${styleMeta.label}</div>` : ''}
        ${youtubeId ? `
          <div class="card-watch-badge" onclick="event.stopPropagation(); watchRecipeVideo('${youtubeId}', '${r.name.replace(/'/g, '\\\'')}')" title="Watch how to cook this">
            ▶ Watch Video
          </div>` : ''}
      </div>
      <div class="recipe-card-body">
        <div class="recipe-tags-row">
          <span class="recipe-cuisine-tag tag-${r.cuisine}">${r.cuisine.charAt(0).toUpperCase() + r.cuisine.slice(1)}</span>
          <span class="recipe-difficulty difficulty-${r.difficulty.toLowerCase()}">${r.difficulty}</span>
        </div>
        <h3>${r.name}</h3>
        <p>${r.description}</p>
        <!-- Ingredient emoji preview strip -->
        <div class="card-ingredient-strip">
          ${r.ingredients.slice(0, 5).map(ing => `
            <div class="card-ing-chip" title="${ing.replace(/['"]/g, '')}">
              <span class="card-ing-emoji">${getIngEmoji(ing)}</span>
              <span class="card-ing-label">${ing.replace(/^\d+[\w.\/]*\s*(g|kg|ml|L|tbsp|tsp|cup|oz|lb|pcs|cloves?|medium|large|small|fresh|dried|sliced|minced|chopped|grated|cubed|diced)?\s*/i, '').split(',')[0].split('(')[0].trim().slice(0, 14)}</span>
            </div>`).join('')}
        </div>
        ${dietTags.length ? `<div class="card-diet-tags">${dietTags.slice(0, 3).map(t => `<span class="card-diet-tag">${t}</span>`).join('')}</div>` : ''}
        <div class="recipe-meta">
          <span class="recipe-meta-item">⏱️ ${r.time}</span>
          <span class="recipe-meta-item">👥 Serves ${r.serves}</span>
          <span class="calorie-badge" style="--cal-color:${calLevel.color}" title="Estimated calories per serving">
            🔥 ~${r.calories} kcal <small>(${calLevel.label})</small>
          </span>
        </div>
        ${nutrition ? `
          <div class="card-nutrition-mini">
            <div class="card-macro"><span>${nutrition.protein}g</span><small>Protein</small></div>
            <div class="card-macro"><span>${nutrition.carbs}g</span><small>Carbs</small></div>
            <div class="card-macro"><span>${nutrition.fat}g</span><small>Fat</small></div>
            <div class="card-macro"><span>${nutrition.fiber}g</span><small>Fiber</small></div>
          </div>` : ''}
        <div class="recipe-action-row" onclick="event.stopPropagation()">
          <button class="recipe-btn-view" onclick="openRecipe('${r.id}')">📖 Full Recipe</button>
          ${youtubeId ? `<button class="recipe-btn-watch" onclick="watchRecipeVideo('${youtubeId}','${r.name.replace(/'/g, '\\\'')}')" title="Watch cooking video">🎬</button>` : ''}
          <button class="recipe-btn-save ${saved ? 'saved' : ''}" id="save-${r.id}"
            onclick="toggleSave('${r.id}')">
            ${saved ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>`;
}

function filterRecipes(cuisine, btn) {
  currentFilter = cuisine;
  displayedCount = 9;
  // reset style filter when cuisine changes
  currentStyleFilter = 'all';
  document.querySelectorAll('.style-filter-btn').forEach(b => b.classList.remove('active'));
  const allStyleBtn = document.querySelector('.style-filter-btn[data-style="all"]');
  if (allStyleBtn) allStyleBtn.classList.add('active');
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderRecipes();
  document.getElementById('recipes').scrollIntoView({ behavior: 'smooth' });
}

function filterByCuisine(cuisine) {
  filterRecipes(cuisine, null);
  const btn = document.querySelector(`[data-filter="${cuisine}"]`);
  if (btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

function filterByStyle(style, btn) {
  currentStyleFilter = style;
  displayedCount = 9;
  document.querySelectorAll('.style-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderRecipes();
}

function loadMoreRecipes() {
  displayedCount += 6;
  renderRecipes();
}

/* ══════════════════════════════════════
   LUXURY & BAKERY RENDERS
══════════════════════════════════════ */
function renderLuxuryGrid() {
  document.getElementById('luxuryGrid').innerHTML = LUXURY_RECIPES.map(r => `
    <div class="luxury-card" onclick="${r.id ? `openRecipe('${r.id}')` : 'showToast(\"Full recipe coming soon!\")'}" >
      <div class="luxury-card-top" style="background: ${r.color};">
        <div class="luxury-stars">★★★★★</div>
        <div class="luxury-emoji">${r.emoji}</div>
      </div>
      <div class="luxury-card-body">
        <div class="luxury-badge">★ Fine Dining</div>
        <h3>${r.name}</h3>
        <p>${r.desc}</p>
        <div class="luxury-meta">
          <span>⏱️ ${r.time}</span>
          <span>🎯 ${r.difficulty}</span>
        </div>
      </div>
    </div>`).join('');
}

function renderBakeryGrid() {
  document.getElementById('bakeryGrid').innerHTML = BAKERY_ITEMS.map(b => `
    <div class="bakery-mini-card" onclick="${b.id ? `openRecipe('${b.id}')` : 'showToast(\"Full recipe coming soon!\")'}" >
      <div class="bakery-mini-emoji">${b.emoji}</div>
      <div>
        <h4>${b.name}</h4>
        <p>${b.desc}</p>
        <div class="bakery-mini-meta">
          <span>⏱️ ${b.time}</span>
          <span>${b.stars}</span>
        </div>
      </div>
    </div>`).join('');
}

function renderMyanmarCards() {
  document.getElementById('myanmarCards').innerHTML = MYANMAR_CARDS.map(m => `
    <div class="myanmar-recipe-card" onclick="${m.id ? `openRecipe('${m.id}')` : 'showToast(\"Full recipe coming soon!\")'}" >
      <div class="m-emoji">${m.emoji}</div>
      <h4>${m.name}</h4>
      <p>${m.desc}</p>
    </div>`).join('');
}

/* ══════════════════════════════════════
   RECIPE MODAL
══════════════════════════════════════ */
function openRecipe(id) {
  const r = RECIPES.find(x => x.id === id);
  if (!r) { showToast('Full recipe coming soon!'); return; }
  const extras = RECIPE_EXTRAS[r.id] || {};
  const nutrition = extras.nutrition;
  const dietTags = extras.dietTags || [];
  const dietNote = extras.dietNote || '';
  const youtubeId = extras.youtubeId;

  const overlay = document.getElementById('recipeOverlay');
  const content = document.getElementById('recipeModalContent');

  // Calorie level
  const calLevel = r.calories < 250 ? { label: 'Light Meal', icon: '🥗', color: '#06D6A0' }
    : r.calories < 450 ? { label: 'Moderate', icon: '⚖️', color: '#FFB703' }
      : { label: 'Hearty / Rich', icon: '🍖', color: '#FF6B35' };

  // Build nutrition bar widths (relative to a 2000 kcal/day reference)
  const proteinPct = nutrition ? Math.min((nutrition.protein / 50) * 100, 100) : 0;
  const carbsPct = nutrition ? Math.min((nutrition.carbs / 275) * 100, 100) : 0;
  const fatPct = nutrition ? Math.min((nutrition.fat / 78) * 100, 100) : 0;
  const fiberPct = nutrition ? Math.min((nutrition.fiber / 28) * 100, 100) : 0;
  const sodiumPct = nutrition ? Math.min((nutrition.sodium / 2300) * 100, 100) : 0;

  // Sodium warning
  const sodiumWarn = nutrition && nutrition.sodium > 1200 ? '⚠️ High' : nutrition && nutrition.sodium > 800 ? '⚡ Moderate' : '✅ Low';
  const sodiumColor = nutrition && nutrition.sodium > 1200 ? '#F87171' : nutrition && nutrition.sodium > 800 ? '#FFB703' : '#06D6A0';

  const heroStyle = r.photo
    ? `background: url('${r.photo}') center/cover no-repeat;`
    : `background: ${r.color};`;

  content.innerHTML = `
    ${youtubeId ? `
      <!-- ── YouTube Video Embed ── -->
      <div class="recipe-video-embed">
        <div class="recipe-video-header">
          <span class="recipe-video-label">🎬 Watch How to Cook This</span>
          <button class="recipe-video-close-vid" onclick="collapseVideo(this)" title="Hide video">▲ Hide</button>
        </div>
        <div class="recipe-video-frame" id="recipeVideoFrame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&enablejsapi=1"
            title="How to cook ${r.name}"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy"
            data-search="${extras.searchQuery || r.name + ' recipe'}"
          ></iframe>
        </div>
      </div>` : `
      <div class="recipe-modal-hero" style="${heroStyle}">
        ${!r.photo ? `<div class="recipe-modal-emoji">${r.emoji}</div>` : ''}
      </div>`}

    <div class="recipe-modal-body">
      <div class="recipe-modal-title-row">
        <div>
          <div class="recipe-modal-emoji-small">${r.emoji}</div>
          <h2>${r.name}</h2>
          <p>${r.description}</p>
        </div>
      </div>

      <!-- ── Quick Meta ── -->
      <div class="recipe-modal-meta">
        <div class="meta-chip">⏱️ ${r.time}</div>
        <div class="meta-chip">👥 Serves ${r.serves}</div>
        <div class="meta-chip">🎯 ${r.difficulty}</div>
        <div class="meta-chip" style="border-color:${calLevel.color};color:${calLevel.color}">${calLevel.icon} ~${r.calories} kcal <small>(${calLevel.label})</small></div>
        <div class="meta-chip">${'⭐'.repeat(r.stars)}</div>
      </div>

      ${nutrition ? `
      <!-- ── Full Nutrition Panel ── -->
      <div class="nutrition-panel">
        <div class="nutrition-panel-header">
          <h3>📊 Nutrition Facts <small>Estimated per serving</small></h3>
          <div class="nutrition-disclaimer">*Values are estimates for dietary guidance only</div>
        </div>
        <div class="nutrition-content">
          <div class="nutrition-main">
            <div class="nutrition-calories-big">
              <div class="nut-cal-num">${r.calories}</div>
              <div class="nut-cal-label">Calories<br><small>per serving</small></div>
            </div>
            <div class="nutrition-bars">
              <div class="nut-bar-row">
                <div class="nut-bar-label"><span>Protein</span><span class="nut-val">${nutrition.protein}g</span></div>
                <div class="nut-bar-track"><div class="nut-bar-fill protein-fill" style="width:${proteinPct}%"></div></div>
                <div class="nut-bar-dv">${Math.round(proteinPct)}% DV</div>
              </div>
              <div class="nut-bar-row">
                <div class="nut-bar-label"><span>Carbohydrates</span><span class="nut-val">${nutrition.carbs}g</span></div>
                <div class="nut-bar-track"><div class="nut-bar-fill carbs-fill" style="width:${carbsPct}%"></div></div>
                <div class="nut-bar-dv">${Math.round(carbsPct)}% DV</div>
              </div>
              <div class="nut-bar-row">
                <div class="nut-bar-label"><span>Total Fat</span><span class="nut-val">${nutrition.fat}g</span></div>
                <div class="nut-bar-track"><div class="nut-bar-fill fat-fill" style="width:${fatPct}%"></div></div>
                <div class="nut-bar-dv">${Math.round(fatPct)}% DV</div>
              </div>
              <div class="nut-bar-row">
                <div class="nut-bar-label"><span>Dietary Fiber</span><span class="nut-val">${nutrition.fiber}g</span></div>
                <div class="nut-bar-track"><div class="nut-bar-fill fiber-fill" style="width:${fiberPct}%"></div></div>
                <div class="nut-bar-dv">${Math.round(fiberPct)}% DV</div>
              </div>
              <div class="nut-bar-row">
                <div class="nut-bar-label"><span>Sodium</span><span class="nut-val" style="color:${sodiumColor}">${nutrition.sodium}mg ${sodiumWarn}</span></div>
                <div class="nut-bar-track"><div class="nut-bar-fill sodium-fill" style="width:${sodiumPct}%;background:${sodiumColor}"></div></div>
                <div class="nut-bar-dv" style="color:${sodiumColor}">${Math.round(sodiumPct)}% DV</div>
              </div>
            </div>
          </div>
          <div class="nutrition-right">
            <div class="macro-ring-section">
              <div class="macro-ring-chart" style="
                background: conic-gradient(
                  #4ADE80 0% ${Math.round(nutrition.protein * 4 / r.calories * 100)}%,
                  #F59E0B ${Math.round(nutrition.protein * 4 / r.calories * 100)}% ${Math.round((nutrition.protein * 4 + nutrition.carbs * 4) / r.calories * 100)}%,
                  #F87171 ${Math.round((nutrition.protein * 4 + nutrition.carbs * 4) / r.calories * 100)}% 100%
                );">
                <div class="macro-ring-center">Calories</div>
              </div>
              <div class="macro-ring-legend">
                <div class="mrl-item"><span class="mrl-dot" style="background:#4ADE80"></span>Protein ${Math.round(nutrition.protein * 4 / r.calories * 100)}%</div>
                <div class="mrl-item"><span class="mrl-dot" style="background:#F59E0B"></span>Carbs ${Math.round(nutrition.carbs * 4 / r.calories * 100)}%</div>
                <div class="mrl-item"><span class="mrl-dot" style="background:#F87171"></span>Fat ${Math.round(nutrition.fat * 9 / r.calories * 100)}%</div>
              </div>
            </div>
            <div class="diet-tags-section">
              <div class="diet-section-label">Dietary Notes</div>
              <div class="diet-tags-list">
                ${dietTags.map(t => `<span class="diet-tag-badge">${t}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
        ${dietNote ? `<div class="diet-note-box">💚 <strong>Health Insight:</strong> ${dietNote}</div>` : ''}
      </div>` : ''}

      <!-- ── Recipe Content ── -->
      <div class="recipe-modal-cols">
        <div>
          <h3>Ingredients <small style="font-size:0.75rem;color:var(--text-muted);font-weight:400">(${r.ingredients.length} items)</small></h3>
          <div class="ingredient-visual-grid">
            ${r.ingredients.map(i => `
              <div class="ing-card">
                <div class="ing-card-emoji">${getIngEmoji(i)}</div>
                <div class="ing-card-text">${i}</div>
              </div>`).join('')}
          </div>
        </div>
        <div>
          <h3>Instructions</h3>
          <ol class="step-list">
            ${r.steps.map((s, i) => `
              <li class="step-item">
                <div class="step-num">${i + 1}</div>
                <div class="step-text">${s}</div>
              </li>`).join('')}
          </ol>
        </div>
      </div>
      ${r.tip ? `<div class="recipe-tip">💡 <strong>Chef's Tip:</strong> ${r.tip}</div>` : ''}

      ${youtubeId ? `
      <div class="recipe-rewatch-btn">
        <button class="btn-primary" onclick="document.getElementById('recipeVideoFrame').scrollIntoView({behavior:'smooth'})">
          🎬 Rewatch the Cooking Video
        </button>
      </div>` : ''}

      <!-- AI Recipe Adapter -->
      <div class="adapt-recipe-panel">
        <div class="adapt-header">
          <span class="adapt-title">🤖 Adapt This Recipe for My Diet</span>
          <div class="adapt-type-btns">
            ${Object.entries(DIET_TYPE_META).map(([k, v]) => `
              <button class="adapt-type-btn" onclick="adaptRecipeForDiet('${r.id}','${k}',this)">${v.emoji} ${v.label}</button>`).join('')}
          </div>
        </div>
        <div class="adapt-result" id="adaptResult-${r.id}"></div>
      </div>
    </div>`;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function collapseVideo(btn) {
  const frame = document.getElementById('recipeVideoFrame');
  if (!frame) return;
  const isHidden = frame.style.display === 'none';
  frame.style.display = isHidden ? 'block' : 'none';
  btn.textContent = isHidden ? '▲ Hide' : '▼ Show Video';
}

function watchRecipeVideo(youtubeId, name) {
  const overlay = document.getElementById('recipeOverlay');
  const content = document.getElementById('recipeModalContent');
  content.innerHTML = `
    <div style="padding:20px">
      <h3 style="font-family:var(--font-heading);color:white;margin-bottom:16px">🎬 ${name}</h3>
      <div style="position:relative;padding-bottom:56.25%;height:0;border-radius:var(--radius-lg);overflow:hidden">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1"
          style="position:absolute;top:0;left:0;width:100%;height:100%;border:none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          data-search="${name} recipe"
        ></iframe>
      </div>
      <p style="margin-top:16px;color:var(--text-muted);font-size:0.85rem">
        Watch the full cooking demonstration. You can pause, rewind, and cook along in real time!
        <br>After watching, <button onclick="closeRecipe()" style="background:none;border:none;color:var(--primary);cursor:pointer;text-decoration:underline">go back</button> to view the full recipe and nutrition details.
      </p>
    </div>`;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeRecipe(e) {
  if (e && e.target !== document.getElementById('recipeOverlay')) return;
  document.getElementById('recipeOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

async function adaptRecipeForDiet(recipeId, dietType, btn) {
  const r = RECIPES.find(x => x.id === recipeId);
  const meta = DIET_TYPE_META[dietType];
  if (!r || !meta) return;

  const panel = document.getElementById(`adaptResult-${recipeId}`);
  if (!panel) return;

  // Update active button state
  btn.closest('.adapt-type-btns').querySelectorAll('.adapt-type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  panel.innerHTML = `<div class="adapt-loading"><span style="display:inline-block;animation:spin 0.8s linear infinite">⟳</span> Adapting for ${meta.label} diet…</div>`;

  try {
    const ingredients = r.ingredients.join(', ');
    const steps = r.steps.map((s, i) => `${i + 1}. ${s} `).join('\n');
    const messages = [{
      role: 'user',
      content: `Adapt the following recipe to strictly follow the ${meta.label} diet(${meta.desc}).

        Recipe: ${r.name}
Original Ingredients: ${ingredients}
Original Steps:
${steps}

Return ONLY the adapted recipe in this exact format(no extra preamble):
** Adapted Ingredients:**
        - (list each change or kept ingredient)

      ** Adapted Steps:**
        1.(list each step)

        ** Why This Works for ${meta.label}:**
          (1 - 2 sentences on the key swaps made)`
    }];
    const result = await callOpenAIRaw(messages, 900);
    panel.innerHTML = `<div class="adapt-output"> ${formatOpenAIResponse(result)}</div> `;
  } catch (err) {
    panel.innerHTML = `<div class="adapt-error">❌ Adaptation failed.Please try again.</div> `;
  }
}

/* ══════════════════════════════════════
   TECHNIQUE MODAL
══════════════════════════════════════ */
function showTechnique(key) {
  const tech = TECHNIQUES[key];
  if (!tech) return;
  const overlay = document.getElementById('techniqueOverlay');
  document.getElementById('techniqueModalContent').innerHTML = `
      < h2 > ${tech.title}</h2 >
    <p class="tech-intro">${tech.intro}</p>
    <div class="tech-steps">
      ${tech.steps.map(s => `
        <div class="tech-step">
          <div class="tech-step-icon">${s.icon}</div>
          <div>
            <h4>${s.title}</h4>
            <p>${s.desc}</p>
          </div>
        </div>`).join('')}
    </div>`;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeTechnique(e) {
  if (e && e.target !== document.getElementById('techniqueOverlay')) return;
  document.getElementById('techniqueOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════
   SAVED RECIPES
══════════════════════════════════════ */
function toggleSave(id) {
  const idx = savedRecipes.indexOf(id);
  if (idx === -1) {
    savedRecipes.push(id);
    showToast('❤️ Recipe saved!');
  } else {
    savedRecipes.splice(idx, 1);
    showToast('Removed from saved recipes');
  }
  localStorage.setItem('culinaryai_saved', JSON.stringify(savedRecipes));
  const btn = document.getElementById(`save - ${id} `);
  if (btn) {
    btn.textContent = savedRecipes.includes(id) ? '❤️' : '🤍';
    btn.classList.toggle('saved', savedRecipes.includes(id));
  }
}

/* ══════════════════════════════════════
   TOOLS — CONVERTERS
══════════════════════════════════════ */
const VOL_TO_ML = { tsp: 4.92892, tbsp: 14.7868, cup: 240, fl_oz: 29.5735, ml: 1, l: 1000 };
const WEIGHT_TO_G = { g: 1, kg: 1000, oz: 28.3495, lb: 453.592 };

function convertVolume() {
  const val = parseFloat(document.getElementById('volInput').value);
  const from = document.getElementById('volFrom').value;
  const to = document.getElementById('volTo').value;
  const el = document.getElementById('volResult');
  if (isNaN(val)) { el.textContent = 'Enter a value above'; return; }
  const ml = val * VOL_TO_ML[from];
  const result = ml / VOL_TO_ML[to];
  el.textContent = `${val} ${from} = ${result % 1 === 0 ? result : result.toFixed(3)} ${to} `;
}

function convertWeight() {
  const val = parseFloat(document.getElementById('weightInput').value);
  const from = document.getElementById('weightFrom').value;
  const to = document.getElementById('weightTo').value;
  const el = document.getElementById('weightResult');
  if (isNaN(val)) { el.textContent = 'Enter a value above'; return; }
  const g = val * WEIGHT_TO_G[from];
  const result = g / WEIGHT_TO_G[to];
  el.textContent = `${val} ${from} = ${result % 1 === 0 ? result : result.toFixed(3)} ${to} `;
}

function convertTemp() {
  const val = parseFloat(document.getElementById('tempInput').value);
  const from = document.getElementById('tempFrom').value;
  const to = document.getElementById('tempTo').value;
  const el = document.getElementById('tempResult');
  if (isNaN(val)) { el.textContent = 'Enter a value above'; return; }
  let celsius;
  if (from === 'C') celsius = val;
  else if (from === 'F') celsius = (val - 32) / 1.8;
  else celsius = val * 27.8 + 121; // Gas mark approx
  let result;
  if (to === 'C') result = celsius.toFixed(1) + ' °C';
  else if (to === 'F') result = (celsius * 1.8 + 32).toFixed(1) + ' °F';
  else result = 'Gas Mark ' + Math.round((celsius - 121) / 27.8);
  el.textContent = `${val} ${from} = ${result} `;
}

/* ══════════════════════════════════════
   TOOLS — TIMER
══════════════════════════════════════ */
function initTimerDisplay() {
  updateTimerDisplay(0);
}

function setTimer(minutes, label) {
  resetTimer();
  totalTimerSeconds = minutes * 60;
  timerSeconds = totalTimerSeconds;
  document.getElementById('timerLabel').textContent = label || `${minutes} min timer`;
  updateTimerDisplay(timerSeconds);
  updateRing(timerSeconds, totalTimerSeconds);
  startCountdown();
}

function startCustomTimer() {
  const h = parseInt(document.getElementById('customHours').value) || 0;
  const m = parseInt(document.getElementById('customMinutes').value) || 0;
  const s = parseInt(document.getElementById('customSeconds').value) || 0;
  const label = document.getElementById('customLabel').value || 'Custom timer';
  totalTimerSeconds = h * 3600 + m * 60 + s;
  if (!totalTimerSeconds) { showToast('Please set a time first!'); return; }
  timerSeconds = totalTimerSeconds;
  document.getElementById('timerLabel').textContent = label;
  resetTimer(false);
  startCountdown();
}

function startCountdown() {
  timerRunning = true;
  document.getElementById('pauseBtn').disabled = false;
  timerInterval = setInterval(() => {
    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      document.getElementById('timerLabel').textContent = '🎉 Time\'s up!';
      document.getElementById('timerDisplay').textContent = '00:00';
      updateRing(0, totalTimerSeconds);
      if ('vibrate' in navigator) navigator.vibrate([400, 200, 400]);
      showToast('⏰ Timer complete!');
      return;
    }
    timerSeconds--;
    updateTimerDisplay(timerSeconds);
    updateRing(timerSeconds, totalTimerSeconds);
  }, 1000);
}

function pauseTimer() {
  if (timerRunning) {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('pauseBtn').textContent = '▶️ Resume';
  } else {
    startCountdown();
    document.getElementById('pauseBtn').textContent = '⏸️ Pause';
  }
}

function resetTimer(full = true) {
  clearInterval(timerInterval);
  timerRunning = false;
  if (full) {
    timerSeconds = 0;
    totalTimerSeconds = 0;
    document.getElementById('timerLabel').textContent = 'Ready to cook?';
    updateTimerDisplay(0);
    updateRing(1, 1);
  }
  document.getElementById('pauseBtn').disabled = true;
  document.getElementById('pauseBtn').textContent = '⏸️ Pause';
}

function updateTimerDisplay(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  document.getElementById('timerDisplay').textContent = h > 0
    ? `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} `
    : `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} `;
}

function updateRing(current, total) {
  const circumference = 565.49;
  const progress = total > 0 ? current / total : 1;
  const offset = circumference * (1 - progress);
  document.getElementById('ringProgress').style.strokeDashoffset = offset;
}

/* ══════════════════════════════════════
   TOOLS — SUBSTITUTIONS
══════════════════════════════════════ */
function renderSubstitutions(query) {
  const filtered = query
    ? SUBSTITUTIONS.filter(s => s.ingredient.toLowerCase().includes(query.toLowerCase()))
    : SUBSTITUTIONS;
  document.getElementById('subGrid').innerHTML = filtered.map(s => `
      < div class="sub-card" >
      <div class="sub-card-header">
        <div class="sub-icon">${s.icon}</div>
        <div>
          <h4>${s.ingredient}</h4>
          <small>${s.category}</small>
        </div>
      </div>
      <div class="sub-options">
        ${s.options.map(o => `
          <div class="sub-option">
            <span class="sub-option-icon">${o.icon}</span>
            <span>${o.text}</span>
          </div>`).join('')}
      </div>
    </div> `).join('') || '<p style="color:var(--text-muted);text-align:center;padding:40px">No substitutions found. Try another ingredient!</p>';
}

function searchSubstitutions() {
  renderSubstitutions(document.getElementById('subSearch').value);
}

/* ══════════════════════════════════════
   TOOLS — PORTION CALCULATOR
══════════════════════════════════════ */
function adjustPortion(type, delta) {
  if (type === 'original') {
    originalServes = Math.max(1, originalServes + delta);
    document.getElementById('originalServes').textContent = originalServes;
  } else {
    desiredServes = Math.max(1, desiredServes + delta);
    document.getElementById('desiredServes').textContent = desiredServes;
  }
  const mult = (desiredServes / originalServes).toFixed(2);
  document.getElementById('portionMultiplier').innerHTML = `Multiplier: <strong>${mult}×</strong>`;
}

function addIngredientRow() {
  const row = document.createElement('div');
  row.className = 'ingredient-row';
  row.innerHTML = `
      < input type = "number" class="ing-amount" value = "1" step = "0.25" />
    <select class="ing-unit">
      <option>cups</option><option>tbsp</option><option>tsp</option>
      <option>g</option><option>kg</option><option>oz</option><option>lb</option>
      <option>ml</option><option>L</option><option>pieces</option>
    </select>
    <input type="text" class="ing-name" placeholder="Ingredient name" />`;
  document.getElementById('ingredientRows').appendChild(row);
}

function calculatePortions() {
  const multiplier = desiredServes / originalServes;
  const rows = document.querySelectorAll('.ingredient-row');
  const resultsEl = document.getElementById('portionResults');
  let html = `< h4 style = "color:var(--accent2);margin-bottom:16px" > Scaled for ${desiredServes} servings(${(multiplier).toFixed(2)}×):</h4 > `;
  rows.forEach(row => {
    const amount = parseFloat(row.querySelector('.ing-amount').value) || 0;
    const unit = row.querySelector('.ing-unit').value;
    const name = row.querySelector('.ing-name').value;
    if (!name) return;
    const scaled = (amount * multiplier);
    const display = scaled % 1 === 0 ? scaled : scaled.toFixed(2);
    html += `< div style = "padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;justify-content:space-between" >
      <span style="color:var(--text-light)">${name}</span>
      <span style="color:var(--accent2);font-weight:600">${display} ${unit}</span>
    </div> `;
  });
  resultsEl.innerHTML = html;
  resultsEl.style.display = 'block';
}

/* ══════════════════════════════════════
   TOOL TABS
══════════════════════════════════════ */
function switchTool(id, btn) {
  document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tool-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(`tool - ${id} `).classList.add('active');
  btn.classList.add('active');
}

/* ══════════════════════════════════════
   AI CHAT
══════════════════════════════════════ */
function openChat() {
  document.getElementById('chatOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('chatInput').focus(), 300);
}

function closeChat(e) {
  if (e && e.target !== document.getElementById('chatOverlay')) return;
  document.getElementById('chatOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function sendSuggestion(text) {
  document.getElementById('chatInput').value = text;
  sendMessage();
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  appendUserMessage(msg);
  showTyping();

  const apiKey = localStorage.getItem(OPENAI_KEY_STORAGE);
  try {
    updateChatStatus('thinking');
    const aiText = await callOpenAI(msg, apiKey);
    removeTyping();
    updateChatStatus('online');
    appendAIMessage(formatOpenAIResponse(aiText));
  } catch (err) {
    removeTyping();
    updateChatStatus('offline');
    // Fallback to built-in responses on API error
    const fallback = generateAIResponse(msg);
    appendAIMessage(`<p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:8px">⚠️ AI API unavailable — using fallback chef knowledge.</p>${fallback}`);
    console.warn('OpenAI error:', err.message);
  }
}

/* ══════════════════════════════════════
   OPENAI API INTEGRATION
══════════════════════════════════════ */
async function callOpenAI(userMessage, apiKey) {
  // Add user message to history
  conversationHistory.push({ role: 'user', content: userMessage });
  // Keep only last 14 messages (7 turns) to manage tokens
  if (conversationHistory.length > 14) conversationHistory.splice(0, 2);

  const body = {
    model: OPENAI_MODEL,
    max_tokens: 600,
    temperature: 0.7,
    messages: [
      { role: 'system', content: CHEF_SYSTEM_PROMPT },
      ...conversationHistory
    ]
  };

  const url = apiKey ? OPENAI_API : PROXY_API;
  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) Object.assign(headers, { 'Authorization': `Bearer ${apiKey}` });

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    const errMsg = errData.error?.message || `HTTP ${res.status} `;
    conversationHistory.pop(); // Remove failed message from history
    throw new Error(errMsg);
  }

  const data = await res.json();
  const assistantMsg = data.choices?.[0]?.message?.content || '';
  // Add assistant reply to history
  conversationHistory.push({ role: 'assistant', content: assistantMsg });
  return assistantMsg;
}

/**
 * callOpenAIRaw — direct one-shot call, no chat history.
 * Used by generateAIDietPlan and adaptRecipeForDiet where we need
 * custom message arrays and higher token limits.
 */
async function callOpenAIRaw(messages, maxTokens = 2500) {
  const apiKey = localStorage.getItem(OPENAI_KEY_STORAGE);
  const url = apiKey ? OPENAI_API : PROXY_API;
  const headers = { 'Content-Type': 'application/json' };
  if (apiKey) Object.assign(headers, { 'Authorization': `Bearer ${apiKey}` });

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: OPENAI_MODEL,
      max_tokens: maxTokens,
      temperature: 0.7,
      messages
    })
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error?.message || `HTTP ${res.status} `);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

function formatOpenAIResponse(text) {
  // Convert markdown-style text to HTML
  let html = text
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Headers
    .replace(/^### (.+)$/gm, '<h4 style="color:var(--accent2);margin:10px 0 4px">$1</h4>')
    .replace(/^## (.+)$/gm, '<h3 style="color:var(--primary);margin:12px 0 6px">$1</h3>')
    // Numbered list items
    .replace(/^\d+\.\s(.+)$/gm, '<li>$1</li>')
    // Bullet list items
    .replace(/^[-•]\s(.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> items in <ul>
    .replace(/(<li>.*<\/li>\n?)+/gs, m => `< ul style = "padding-left:18px;margin:6px 0" > ${m}</ul > `)
    // Paragraph breaks
    .replace(/\n\n+/g, '</p><p>')
    // Single newlines
    .replace(/\n/g, '<br>');

  // Wrap in paragraph tags if not starting with a block element
  if (!html.startsWith('<h') && !html.startsWith('<ul') && !html.startsWith('<p')) {
    html = `<p> ${html}</p> `;
  }
  return html;
}

function updateChatStatus(state) {
  const dot = document.getElementById('chatStatusDot');
  const text = document.getElementById('chatStatusText');
  const avatar = document.getElementById('aiAvatarPulse');
  if (!dot || !text) return;

  dot.className = 'status-dot';
  if (state === 'online') {
    dot.classList.add('dot-online');
    text.textContent = 'OpenAI GPT-4o — Cooking Expert';
    if (avatar) avatar.style.animation = '';
  } else if (state === 'thinking') {
    dot.classList.add('dot-thinking');
    text.textContent = 'Chef AI is thinking…';
    if (avatar) avatar.style.animation = 'aiAvatarThink 0.6s ease infinite alternate';
  } else if (state === 'offline') {
    dot.classList.add('dot-offline');
    text.textContent = 'Built-in Chef Mode (no API key)';
    if (avatar) avatar.style.animation = '';
  }
}

/* ══════════════════════════════════════
   API KEY MANAGEMENT
══════════════════════════════════════ */
function openKeySettings() {
  const panel = document.getElementById('keySettingsPanel');
  if (!panel) return;
  const isOpen = panel.classList.contains('panel-open');
  panel.classList.toggle('panel-open', !isOpen);
  if (!isOpen) {
    // Show current key masked
    const saved = localStorage.getItem(OPENAI_KEY_STORAGE);
    const input = document.getElementById('openaiKeyInput');
    if (saved && input) {
      input.placeholder = '••••••••••••••••••' + saved.slice(-6);
      input.value = '';
    }
  }
}

function saveOpenAIKey() {
  const input = document.getElementById('openaiKeyInput');
  const key = input ? input.value.trim() : '';
  if (!key) {
    showToast('Please paste your OpenAI API key first');
    return;
  }
  if (!key.startsWith('sk-')) {
    showToast('⚠️ That doesn\'t look like a valid OpenAI key (should start with sk-)');
    return;
  }
  localStorage.setItem(OPENAI_KEY_STORAGE, key);
  conversationHistory = []; // Reset history when key changes
  input.value = '';
  input.placeholder = '••••••••••••••••••' + key.slice(-6);
  document.getElementById('keySettingsPanel').classList.remove('panel-open');
  updateChatStatus('online');
  showToast('🔑 API key saved! Chef AI is now powered by OpenAI GPT-4o');
}

function clearOpenAIKey() {
  localStorage.removeItem(OPENAI_KEY_STORAGE);
  conversationHistory = [];
  const input = document.getElementById('openaiKeyInput');
  if (input) { input.value = ''; input.placeholder = 'sk-proj-...'; }
  document.getElementById('keySettingsPanel').classList.remove('panel-open');
  updateChatStatus('offline');
  showToast('Key cleared — using built-in chef mode');
}

function initOpenAI() {
  const saved = localStorage.getItem(OPENAI_KEY_STORAGE);
  if (saved) {
    updateChatStatus('online');
    const badge = document.getElementById('aiEngineBadge');
    if (badge) badge.textContent = '⚡ GPT-4o-mini';
  } else {
    // Pre-load the user's key on first run
    const defaultKey = ''; // Add your OpenAI API Key here
    if (defaultKey) {
      localStorage.setItem(OPENAI_KEY_STORAGE, defaultKey);
      updateChatStatus('online');
      const badge = document.getElementById('aiEngineBadge');
      if (badge) badge.textContent = '⚡ GPT-4o-mini';
    } else {
      updateChatStatus('offline');
    }
  }
}

function appendUserMessage(text) {
  const el = createMessageEl('user', `<p> ${escHtml(text)}</p> `);
  document.getElementById('chatMessages').appendChild(el);
  scrollChat();
}

function appendAIMessage(html) {
  const el = createMessageEl('ai', html);
  document.getElementById('chatMessages').appendChild(el);
  scrollChat();
}

function createMessageEl(type, html) {
  const div = document.createElement('div');
  div.className = `chat - msg ${type} -msg`;
  div.innerHTML = `
    <div class="msg-avatar"> ${type === 'ai' ? '👨‍🍳' : '👤'}</div>
      <div class="msg-content">${html}</div>`;
  return div;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'chat-msg ai-msg';
  div.id = 'typingIndicator';
  div.innerHTML = `
        <div class="msg-avatar">👨‍🍳</div>
          <div class="chat-typing">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
          </div>`;
  document.getElementById('chatMessages').appendChild(div);
  scrollChat();
}

function removeTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function scrollChat() {
  const el = document.getElementById('chatMessages');
  el.scrollTop = el.scrollHeight;
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function generateAIResponse(msg) {
  const q = msg.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|good morning|good evening|howdy|greetings)/i.test(q)) {
    return `<p> ${AI_RESPONSES.greetings[Math.floor(Math.random() * AI_RESPONSES.greetings.length)]}</p> `;
  }

  // Substitution requests
  for (const [key, val] of Object.entries(AI_RESPONSES.substitutions)) {
    if (q.includes(key) && (q.includes('substitute') || q.includes('replace') || q.includes('instead of') || q.includes('without') || q.includes('alternative'))) {
      return `<p> ${formatAIText(val)}</p> `;
    }
  }

  // Specific recipe requests
  const recipeMatch = RECIPES.find(r =>
    q.includes(r.name.toLowerCase()) ||
    q.includes(r.id.replace('-', ' '))
  );
  if (recipeMatch) {
    return `<p> Great choice! Here's a quick overview of <strong>${recipeMatch.name}</strong>:</p>
    <p>⏱️ ${recipeMatch.time} | 👥 Serves ${recipeMatch.serves} | 🎯 ${recipeMatch.difficulty}</p>
      <p>${recipeMatch.description}</p>
      <p>💡 <strong>Chef's tip:</strong> ${recipeMatch.tip || 'Follow each step carefully for best results!'}</p>
      <p><em>Click "View Recipe" on the recipe card for full ingredients and step-by-step instructions!</em></p>`;
  }

  // Cuisine recommendations
  for (const [key, val] of Object.entries(AI_RESPONSES.cuisines)) {
    if (q.includes(key)) {
      return `<p> ${formatAIText(val)}</p> `;
    }
  }

  // Technique questions
  for (const [key, val] of Object.entries(AI_RESPONSES.techniques)) {
    if (q.includes(key)) {
      return `<p> ${formatAIText(val)}</p> `;
    }
  }

  // Temperature questions
  for (const [key, val] of Object.entries(AI_RESPONSES.temperatures)) {
    if (q.includes(key)) {
      return `<p> ${formatAIText(val)}</p> `;
    }
  }

  // Conversion questions
  for (const [key, val] of Object.entries(AI_RESPONSES.conversions)) {
    if (q.includes(key)) {
      return `<p> ${formatAIText(val)}</p> `;
    }
  }

  // Ingredient-based suggestions
  const ingredientMap = {
    'chicken': ['Butter Chicken (Indian)', 'Pad Thai (Thai)', 'Thai Green Curry', 'Kung Pao Chicken (Chinese)'],
    'beef': ['Beef Wellington (Luxury)', 'Beef Phở (Vietnamese)', 'Kung Pao Chicken (substitute with beef)'],
    'tofu': ['Mapo Tofu (Chinese)', 'Pad Thai with tofu', 'Korean Soon Dubu Jjigae'],
    'coconut': ['Thai Green Curry', 'Mohinga (Myanmar)', 'Vietnamese Coconut Chicken Soup', 'Mango Sticky Rice'],
    'shrimp': ['Pad Thai', 'Tom Yum Goong', 'Har Gow Dumplings', 'Vietnamese Spring Rolls'],
    'fish': ['Mohinga (Myanmar National Dish)', 'Tom Yum Goong', 'Vietnamese Catfish Hotpot', 'Lobster Thermidor'],
    'mushroom': ['Truffle Risotto', 'Mapo Tofu', 'Wonton Soup', 'Beef Wellington (with duxelles)'],
    'lemongrass': ['Thai Green Curry', 'Tom Yum Goong', 'Mohinga (Myanmar)', 'Vietnamese Pho'],
    'egg': ['Pad Thai', 'Macarons', 'Crème Brûlée', 'Butter Chicken Marinade'],
  };
  for (const [ingredient, suggestions] of Object.entries(ingredientMap)) {
    if (q.includes(ingredient)) {
      return `<p> Great ingredient! With <strong> ${ingredient}</strong>, you could make:</p>
        <ul>${suggestions.map(s => `<li>${s}</li>`).join('')}</ul>
        <p>Would you like the full recipe for any of these? Just ask! 👨‍🍳</p>`;
    }
  }

  // What can I make / ingredient list
  if (q.includes('what can i make') || q.includes('what should i cook') || q.includes('suggest') || q.includes('recommend')) {
    return `<p> I'd love to help you decide what to cook! Tell me:</p>
    < ul >
        <li>🥬 What ingredients do you have?</li>
        <li>🌍 What cuisine are you in the mood for?</li>
        <li>⏱️ How much time do you have?</li>
        <li>🎯 Skill level: easy, medium or challenging?</li>
      </ul >
    <p>For example: <em>"I have chicken, tomatoes, and 30 minutes"</em> or <em>"Suggest an easy Indian recipe."</em></p>`;
  }

  // Vegetarian/vegan
  if (q.includes('vegetarian') || q.includes('vegan') || q.includes('plant-based')) {
    return `<p>🌱 <strong>Vegetarian/Vegan Options:</strong></p>
      <ul>
        <li><strong>Indian:</strong> Palak Paneer (veg), Dal Makhani (veg)</li>
        <li><strong>Chinese:</strong> Mapo Tofu (use vegetable stock)</li>
        <li><strong>Thai:</strong> Green Curry with tofu & vegetables</li>
        <li><strong>Myanmar:</strong> Laphet Thohk Tea Leaf Salad</li>
        <li><strong>Bakery:</strong> Most pastries, sourdough, macarons</li>
      </ul>
      <p>I can also help you adapt any recipe to be vegetarian — just ask!</p>`;
  }

  // Baking help
  if (q.includes('bak') || q.includes('pastry') || q.includes('bread') || q.includes('cake') || q.includes('cookie')) {
    return `<p>🍞 <strong>Baking Essentials to Know:</strong></p>
      <ul>
        <li><strong>Always measure by weight</strong> (not volume) for accuracy</li>
        <li><strong>Room temperature butter and eggs</strong> emulsify better</li>
        <li><strong>Don't overmix</strong> cake batter after adding flour — develops too much gluten</li>
        <li><strong>Oven thermometers</strong> reveal your oven's true temperature (they often lie!)</li>
        <li><strong>The toothpick test:</strong> insert in center — if clean or with moist crumbs, it's done</li>
      </ul>
      <p>What are you baking? I can give specific guidance! 🎂</p>`;
  }

  // Spicy food
  if (q.includes('spicy') || q.includes('chili') || q.includes('heat')) {
    return `<p>🌶️ <strong>Spice & Heat Control:</strong></p>
      <ul>
        <li><strong>Build heat gradually</strong> — add chili incrementally and taste</li>
        <li><strong>Capsaicin is fat-soluble</strong> — dairy (yogurt, cream) neutralizes heat better than water</li>
        <li><strong>To reduce heat:</strong> add coconut milk, yogurt, sugar or acid (lime juice)</li>
        <li><strong>Seed the chilies</strong> — most heat is in the membrane around seeds</li>
        <li><strong>Sichuan peppercorns</strong> add numbing sensation (mala), not just heat</li>
      </ul>
      <p>What are you cooking? I can help calibrate the heat level! 🔥</p>`;
  }

  // General fallback
  return `<p> ${AI_RESPONSES.general[Math.floor(Math.random() * AI_RESPONSES.general.length)]}</p>
    <p>Could you be more specific? I can help you with:</p>
    <ul>
      <li>🍛 Recipes from any of our 9 cuisines</li>
      <li>🔄 Ingredient substitutions</li>
      <li>👨‍🍳 Cooking techniques explained step-by-step</li>
      <li>🌡️ Temperature and timing guidance</li>
      <li>⚖️ Measurement conversions</li>
    </ul>`;
}

function formatAIText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n•/g, '</p><p>•')
    .replace(/\n/g, '<br>');
}

/* ══════════════════════════════════════
   DEMO CHAT TYPING EFFECT
══════════════════════════════════════ */
function startDemoTypingEffect() {
  const demoTyping = document.getElementById('demoTyping');
  if (!demoTyping) return;
  demoTyping.style.opacity = '0';
  setTimeout(() => {
    demoTyping.style.transition = 'opacity 0.5s ease';
    demoTyping.style.opacity = '1';
  }, 2000);
}

/* ══════════════════════════════════════
   SCROLL ANIMATIONS
══════════════════════════════════════ */
function animateOnScroll() {
  const elements = document.querySelectorAll('.cuisine-card, .recipe-card, .technique-card, .luxury-card, .testimonial-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* ══════════════════════════════════════
   NEWSLETTER
══════════════════════════════════════ */
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value.trim();
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address');
    return;
  }
  document.getElementById('newsletterEmail').value = '';
  showToast('🎉 Welcome! You\'re now part of the CulinaryAI community!');
}

/* ══════════════════════════════════════
   DONATE / SUPPORT MODAL
══════════════════════════════════════ */

const DONATE_ACCOUNTS = {
  scb: '816-288865-1',
  kpay: '095043252',
};

function openDonate() {
  document.getElementById('donateOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  // Ensure account numbers are up to date
  const scbEl = document.getElementById('scbAccount');
  const kpayEl = document.getElementById('kpayAccount');
  if (scbEl) scbEl.textContent = DONATE_ACCOUNTS.scb;
  if (kpayEl) kpayEl.textContent = DONATE_ACCOUNTS.kpay;
}

function closeDonate(e) {
  if (e && e.target !== document.getElementById('donateOverlay')) return;
  document.getElementById('donateOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function switchDonateTab(tab) {
  // Update tab buttons
  document.querySelectorAll('.donate-tab').forEach(b => b.classList.remove('active'));
  document.getElementById(tab === 'scb' ? 'tabScb' : 'tabKpay').classList.add('active');
  // Update panels
  document.querySelectorAll('.donate-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(tab === 'scb' ? 'donateScb' : 'donateKpay').classList.add('active');
}

function copyDonateAccount(elementId, btn) {
  const text = document.getElementById(elementId)?.textContent?.trim();
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // Fallback for browsers that block clipboard
    showToast('📋 Account: ' + text);
  });
}

/* ══════════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════════ */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ══════════════════════════════════════
   VIDEO GALLERY
══════════════════════════════════════ */
function renderVideos(filter) {
  currentVideoFilter = filter;
  const grid = document.getElementById('videosGrid');
  if (!grid) return;
  const list = filter === 'all' ? VIDEOS : VIDEOS.filter(v => v.cuisine === filter);
  const ytSearchBase = 'https://www.youtube.com/results?search_query=';
  const ytWatchBase = 'https://www.youtube.com/watch?v=';
  grid.innerHTML = list.map((v, idx) => `
    <div class="video-card" id="vcard-${idx}">
      <div class="video-thumb-wrapper" id="vthumb-${idx}" onclick="playVideo(${idx})" style="cursor:pointer">
        <img
          src="https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg"
          alt="${v.title}"
          style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        />
        <div class="video-thumb-fallback" style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a1a2e,#16213e);flex-direction:column;gap:8px">
          <div style="font-size:2.5rem">🎬</div>
          <div style="color:rgba(255,255,255,0.6);font-size:0.8rem;text-align:center;padding:0 12px">${v.title}</div>
        </div>
        <div class="video-play-overlay" id="voverlay-${idx}">
          <div class="video-play-btn">▶</div>
        </div>
      </div>
      <div class="video-card-body">
        <span class="video-cuisine-label tag-${v.cuisine}">${v.cuisine.charAt(0).toUpperCase() + v.cuisine.slice(1)}</span>
        <h3>${v.title}</h3>
        <p>${v.desc}</p>
        <div class="video-meta">
          <span>🎬 ${v.time}</span>
          <span>👨‍🍳 ${v.chef}</span>
        </div>
        ${v.note ? `<div class="video-chef-note">${v.note}</div>` : ''}
        <div class="video-action-row">
          <button class="vid-play-btn" onclick="playVideo(${idx})">▶ Play Here</button>
          <a class="vid-yt-link" href="${ytWatchBase}${v.youtubeId}" target="_blank" rel="noopener" title="Open in YouTube">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>
            YouTube
          </a>
          <a class="vid-search-link" href="${ytSearchBase}${encodeURIComponent(v.searchQuery || v.title)}" target="_blank" rel="noopener" title="Search on YouTube">🔍</a>
        </div>
      </div>
    </div> `).join('');
}

function playVideo(idx) {
  const filter = currentVideoFilter;
  const list = filter === 'all' ? VIDEOS : VIDEOS.filter(v => v.cuisine === filter);
  const v = list[idx];
  if (!v) return;
  const wrapper = document.getElementById(`vthumb - ${idx} `);
  const overlay = document.getElementById(`voverlay - ${idx} `);
  const card = document.getElementById(`vcard - ${idx} `);
  if (!wrapper) return;

  // Stop any other playing iframe in the grid
  document.querySelectorAll('#videosGrid iframe').forEach(f => {
    f.src = '';
    const w = f.parentNode;
    if (w) {
      const fb = w.querySelector('.video-thumb-fallback');
      const img = w.querySelector('img');
      if (img) img.style.display = '';
      if (fb) fb.style.display = 'none';
      w.removeChild(f);
    }
  });
  document.querySelectorAll('.video-card.playing').forEach(c => c.classList.remove('playing'));
  document.querySelectorAll('.video-play-overlay').forEach(o => {
    o.style.opacity = '';
    o.style.pointerEvents = '';
  });

  // Build iframe
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
  iframe.dataset.search = v.searchQuery || v.title;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:none;';

  // If iframe errors out, swap to fallback
  const ytSearchBase = 'https://www.youtube.com/results?search_query=';
  const ytWatchBase = 'https://www.youtube.com/watch?v=';
  iframe.onerror = () => showVideoFallback(wrapper, v, ytWatchBase, ytSearchBase);

  // Remove thumbnail image, add iframe
  const img = wrapper.querySelector('img');
  if (img) img.style.display = 'none';
  wrapper.appendChild(iframe);

  if (overlay) { overlay.style.opacity = '0'; overlay.style.pointerEvents = 'none'; }
  if (card) { card.classList.add('playing'); card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}

function showVideoFallback(wrapper, v, ytWatchBase, ytSearchBase) {
  // Remove broken iframe, show fallback UI
  const iframe = wrapper.querySelector('iframe');
  if (iframe) iframe.remove();
  const fb = wrapper.querySelector('.video-thumb-fallback') || document.createElement('div');
  fb.className = 'video-thumb-fallback';
  fb.style.cssText = 'display:flex;position:absolute;inset:0;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a1a2e,#16213e);flex-direction:column;gap:12px;padding:16px';
  fb.innerHTML = `
    <div style="font-size:2rem">📺</div>
    <p style="color:rgba(255,255,255,0.7);font-size:0.8rem;text-align:center;margin:0">Video unavailable in embed</p>
    <a href="${ytWatchBase}${v.youtubeId}" target="_blank" rel="noopener"
       style="background:#FF0000;color:white;padding:8px 16px;border-radius:50px;font-size:0.8rem;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:6px">
      ▶ Watch on YouTube
    </a>
    <a href="${ytSearchBase}${encodeURIComponent(v.searchQuery || v.title)}" target="_blank" rel="noopener"
       style="color:rgba(255,255,255,0.5);font-size:0.75rem;text-decoration:underline">
      🔍 Search instead
    </a>`;
  if (!wrapper.contains(fb)) wrapper.appendChild(fb);
}

function switchVideoTab(filter, btn) {
  document.querySelectorAll('.vid-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderVideos(filter);
}

/* ══════════════════════════════════════
   CALORIE ESTIMATOR (per recipe card)
══════════════════════════════════════ */
// Calories are shown in recipe modal meta chips and cards as estimated values
// Each recipe object has a calories field representing per-serving estimate
