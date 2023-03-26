from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.prompt_manager import get_predictions, get_prompt_milestones

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


# Provides GPT response to human_input
# response is string
@app.post("/response", tags=["response"])
async def get_responses(human_input: str) -> dict:
    response = await get_predictions(human_input)
    return {
        "data": { response }
    }


# Provides 5 milestones to learn topic
# Milestones are in JSON format, for example:
# [
# {
#     "Milestone": "Foundation Basics"
# },
# {
#     "Milestone": "Eyeshadow Techniques"
# },
# {
#     "Milestone": "Blush Application"
# },
# {
#     "Milestone": "Lipstick Application"
# },
# {
#     "Milestone": "Contouring Basics"
# }
# ]

@app.post("/milestone", tags=["milestone"])
async def get_milestones(topic: str) -> dict:
    milestones = await get_prompt_milestones(topic)
    print (str(milestones))
    return {
        "data": { milestones }
    }
