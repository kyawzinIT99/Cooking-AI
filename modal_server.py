import modal
from fastapi import FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os

app = modal.App("CulinaryAI")

image = (
    modal.Image.debian_slim()
    .pip_install("fastapi", "starlette", "httpx")
    .add_local_dir(".", remote_path="/assets")
)

web_app = FastAPI()

web_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@web_app.post("/api/chat")
async def chat_proxy(request: Request):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return Response(content='{"error": {"message": "Server API key not configured"}}', status_code=500, media_type="application/json")
    
    body = await request.body()
    
    async with httpx.AsyncClient() as client:
        proxy_req = client.build_request(
            method="POST",
            url="https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            content=body
        )
        try:
            resp = await client.send(proxy_req, timeout=30.0)
            # Remove encoding headers that might conflict
            headers = dict(resp.headers)
            headers.pop("content-encoding", None)
            headers.pop("content-length", None)
            return Response(content=resp.content, status_code=resp.status_code, headers=headers)
        except Exception as e:
            return Response(content=f'{{"error": {{"message": "{str(e)}"}}}}', status_code=500, media_type="application/json")

# Mount the static files
# The current directory will be mounted to /assets in the container
web_app.mount("/", StaticFiles(directory="/assets", html=True, check_dir=False), name="static")

@app.function(
    image=image,
    secrets=[modal.Secret.from_name("openai-api-key")]
)
@modal.asgi_app()
def main():
    return web_app
