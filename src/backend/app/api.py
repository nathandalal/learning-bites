from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.backend.app.dao import milestones

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to Learning Bites!!."}


@app.get("/response", tags=["response"])
async def get_responses() -> str:
    return {"data": 'hello'}


# CRUD Milestones
@app.get("/milestone", tags=["milestones"])
async def get_milestones() -> dict:
    return {"data": milestones}

@app.post("/milestone", tags=["milestones"])
async def add_milestones(milestones: dict) -> dict:
    milestones.append(milestones)
    return {
        "data": { "Milestone added." }
    }

@app.put("/milestone/{id}", tags=["milestones"])
async def update_milestones(id: int, body: dict) -> dict:
    for milestone in milestones:
        if int(milestone["id"]) == id:
            milestone["item"] = body["item"]
            return {
                "data": f"Milestone with id {id} has been updated."
            }

    return {
        "data": f"Milestone with id {id} not found."
    }

@app.delete("/milestone/{id}", tags=["milestones"])
async def delete_milestone(id: int) -> dict:
    for milestone in milestones:
        if int(milestone["id"]) == id:
            milestones.remove(milestone)
            return {
                "data": f"Milestone with id {id} has been removed."
            }

    return {
        "data": f"Milestone with id {id} not found."
    }
