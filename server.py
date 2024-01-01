from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import rotas_auth, rotas_exercicios, rotas_dieta
from src.infra.sqlalchemy.config.database import criar_banco_de_dados

# criar_banco_de_dados()

app = FastAPI()

app.add_middleware(CORSMiddleware,
                allow_origins=["*"],
                allow_credentials=True,
                allow_methods=["*"],
                allow_headers=["*"],)

app.include_router(rotas_auth.router)
app.include_router(rotas_exercicios.router)
app.include_router(rotas_dieta.router)