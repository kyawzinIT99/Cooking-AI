import modal
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os

app = modal.App("CulinaryAI")

image = (
    modal.Image.debian_slim()
    .pip_install("fastapi", "starlette")
    .add_local_dir(".", remote_path="/assets")
)

web_app = FastAPI()

# Mount the static files
# The current directory will be mounted to /assets in the container
web_app.mount("/", StaticFiles(directory="/assets", html=True, check_dir=False), name="static")


@app.function(
    image=image,
    allow_concurrent_inputs=100
)
@modal.asgi_app()
def main():
    return web_app
