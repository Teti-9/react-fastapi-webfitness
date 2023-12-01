from pydantic import ConfigDict, BaseModel, EmailStr, Field
from typing import Optional, List
import datetime

class Exercicio(BaseModel):
    id: Optional[int] = None
    musculo: str
    nome_exercicio: str
    carga: int
    repeticoes: float
    data: Optional[datetime.datetime] = None
    usuario_id: Optional[int] = None
    
    model_config = ConfigDict(from_attributes=True)

class ExercicioEdit(BaseModel):
    id: Optional[int] = None
    musculo: str
    nome_exercicio: Optional[str] = None
    carga: int
    repeticoes: float
    data: Optional[datetime.datetime] = None
    usuario_id: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)

class Usuario(BaseModel):
    id: Optional[int] = None
    nome: str
    senha: str = Field(min_length=5, max_length=14)
    email: EmailStr
    codigo: Optional[str] = None
    verificado: Optional[bool] = None
    exercicios: List[Exercicio] = []

    model_config = ConfigDict(from_attributes=True)

class NovaSenha(BaseModel):
    senha: str = Field(min_length=5, max_length=14)
    model_config = ConfigDict(from_attributes=True)

class LoginData(BaseModel):
    email: str
    senha: str

class LoginSucesso(BaseModel):
    token_de_acesso: str
    tipo_do_token: str