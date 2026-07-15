from fastapi import FastAPI

app = FastAPI(
    title="CI/CD Dashboard API",
    version="0.1.0",
)


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "ci-cd-dashboard-api",
        "version": "0.1.0",
}