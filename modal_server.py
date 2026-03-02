import modal
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os

app = modal.App("kyawzin-ccna")

image = modal.Image.debian_slim().pip_install("fastapi", "starlette")

web_app = FastAPI()

# Mount the static files
# The current directory will be mounted to /assets in the container
web_app.mount("/", StaticFiles(directory="/assets", html=True), name="static")


@app.function(
    image=image,
    mounts=[modal.Mount.from_local_dir(".", remote_path="/assets")],
    allow_concurrent_inputs=100
)
@modal.asgi_app()
def main():
    return web_app
