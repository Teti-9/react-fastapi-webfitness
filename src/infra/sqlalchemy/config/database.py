import os
from pymongo import MongoClient
from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from typing import Annotated
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.environ.get('url')
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

client = MongoClient(os.environ.get("mongodb_url"))
db = client.fastapi_macros
collection_name = db['macros']

def criar_banco_de_dados():
    Base.metadata.create_all(bind=engine)

def receber_banco_de_dados():
    banco_de_dados = SessionLocal()
    try:
        yield banco_de_dados
    except:
        banco_de_dados.close()

db_dependency = Annotated[Session, Depends(receber_banco_de_dados)]