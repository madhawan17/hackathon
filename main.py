import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from typing import AsyncGenerator
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FAISS_PATH = "vectorstore/db_faiss"

# --- Setup Models and Retriever ---
embedding_model = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')
db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
retriever = db.as_retriever(search_kwargs={'k': 3})
llm = ChatGroq(model="llama-3.1-8b-instant", temperature=0.5, max_tokens=1024, api_key=os.environ.get("GROQ_API_KEY"))

# --- Define the Prompt Template ---
system_prompt = (
    "You are an intelligent and empathetic medical assistant named Medibot. "
    "Use the context provided from the medical encyclopedia to answer the user's questions. "
    "Be conversational, concise, and helpful. If you don't know the answer, say so. "
    "Do not make up information.\n\n"
    "Context:\n{context}"
)
prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}"),
])

# --- In-memory store for chat histories ---
session_memory = {}
def get_session_history(session_id: str) -> ChatMessageHistory:
    if session_id not in session_memory:
        session_memory[session_id] = ChatMessageHistory()
    return session_memory[session_id]

# --- The Cleanest Streaming Generator ---
async def stream_generator(prompt_text: str, session_id: str) -> AsyncGenerator[str, None]:
    history = get_session_history(session_id)
    
    # 1. Manually retrieve documents
    retrieved_docs = await retriever.ainvoke(prompt_text)
    
    # 2. Format the document context into a single string
    context_str = "\n\n".join([doc.page_content for doc in retrieved_docs])
    
    # 3. Manually construct the final prompt that will be sent to the LLM
    final_prompt = await prompt.ainvoke({
        "input": prompt_text,
        "chat_history": history.messages,
        "context": context_str
    })
    
    # 4. Stream directly from the LLM, which yields clean token chunks
    full_response = ""
    async for chunk in llm.astream(final_prompt):
        token = chunk.content
        if token:
            yield token
            full_response += token
            
    # 5. After the stream is complete, manually update the history
    history.add_user_message(prompt_text)
    history.add_ai_message(full_response)

# --- FastAPI Endpoint ---
class ChatRequest(BaseModel):
    prompt: str
    session_id: str

@app.post("/chat")
def chat(request: ChatRequest):
    return StreamingResponse(
        stream_generator(request.prompt, request.session_id), 
        media_type="text/plain"
    )

@app.get("/")
def read_root():
    return {"message": "Medibot API running with the definitive streaming fix"}