from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session
from database import engine, get_db
from models import Base, User
import schemas
import auth
from llm import generate_with_mistral
from persona import extract_persona
from chat_engine import generate_platform_message
from auth import get_current_user
from industry_engine import update_industry_playbook



app = FastAPI(title="Offline Outreach Engine")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running successfully"}


@app.get("/db-test")
def test_database():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"database": "Connected successfully"}
    except Exception as e:
        return {"error": str(e)}


# ---------------- REGISTER ----------------

@app.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = auth.hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hashed_password,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user



from fastapi.security import OAuth2PasswordRequestForm

@app.post("/login", response_model=schemas.Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    authenticated_user = auth.authenticate_user(
        db,
        form_data.username,  # this will contain email
        form_data.password
    )

    if not authenticated_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = auth.create_access_token(
        data={"user_id": authenticated_user.id}
    )

    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/llm-test")
def llm_test():
    prompt = "Say hello in one short sentence."
    result = generate_with_mistral(prompt)
    return {"llm_response": result}

from pydantic import BaseModel

class PersonaRequest(BaseModel):
    profile_text: str


@app.post("/extract-persona")
def persona_endpoint(data: PersonaRequest):
    result = extract_persona(data.profile_text)
    return result

class ChatRequest(BaseModel):
    platform: str
    user_input: str
    profile_text: str | None = None

@app.post("/chat")
def chat_endpoint(
    data: ChatRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    result = generate_platform_message(
        user_id=current_user.id,
        platform=data.platform,
        user_input=data.user_input,
        profile_text=data.profile_text,
        db=db
    )
    return result

@app.get("/playbook/{industry}")
def get_industry_playbook(
    industry: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    result = update_industry_playbook(industry, db)

    if not result:
        return {"message": "No outreach data available for this industry yet."}

    return result
