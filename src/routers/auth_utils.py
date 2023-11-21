import os
from dotenv import load_dotenv

load_dotenv()

from src.infra.sqlalchemy.repositorios.repositorio_usuario import RepositorioUsuario
from src.infra.sqlalchemy.config.database import db_dependency
from src.infra.providers import provedor_token
from fastapi.param_functions import Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.exceptions import HTTPException
from starlette import status
from jose import JWTError
from typing import Annotated
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

oauth2_schema = OAuth2PasswordBearer(tokenUrl='token')
token_dependency = Annotated[str, Depends(oauth2_schema)]

def receber_usuario_logado(token: token_dependency, db: db_dependency):
    try:
        email = provedor_token.verificar_token_de_acesso(token)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token inválido!')

    usuario = RepositorioUsuario(db).procurar_email(email)

    if not usuario:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token inválido!')

    return usuario

user_dependency = Annotated[dict, Depends(receber_usuario_logado)]

def enviar_codigo_verificacao(email: str, verification_code: str):
    message = Mail(
        from_email='exercicios.teti@gmail.com',
        to_emails=email,
        subject='Exercícios - Código',
        html_content=f'Seu código de verificacão é: <strong>{verification_code}</strong>')
    
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        sg.send(message)
    except Exception as e:
        print(e)