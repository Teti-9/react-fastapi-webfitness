from sqlalchemy import select, update, and_
from sqlalchemy.orm import Session
from src.schemas import schemas
from src.infra.sqlalchemy.models import models

class RepositorioUsuario:

    def __init__(self, session: Session):
        self.session = session

    def criar(self, usuario: schemas.Usuario):
        usuario_banco_de_dados = models.Usuario(nome = usuario.nome.title(),
                                                senha = usuario.senha,
                                                email = usuario.email,
                                                codigo = usuario.codigo,
                                                verificado = False)
        
        self.session.add(usuario_banco_de_dados)
        self.session.commit()
        self.session.refresh(usuario_banco_de_dados)

        return usuario_banco_de_dados
    
    def mudar_senha(self, usuario: schemas.NovaSenha, email: str):
        acao_mudar_senha = update(models.Usuario).where(models.Usuario.email == email).values(
                                    senha = usuario.senha)

        self.session.execute(acao_mudar_senha)
        self.session.commit()
    
    def procurar_email(self, email: str):
        acao_procurar_email = select(models.Usuario).where(models.Usuario.email == email)
        return self.session.execute(acao_procurar_email).scalars().first()
    
    def procurar_codigo(self, codigo: str):
        acao_procurar_codigo = select(models.Usuario).where(models.Usuario.codigo == codigo)
        return self.session.execute(acao_procurar_codigo).scalars().first()

    def validar_codigo(self, codigo: str):
        acao_verificar_usuario = update(models.Usuario).where(models.Usuario.codigo == codigo).values(
                                            verificado = True)

        self.session.execute(acao_verificar_usuario)
        self.session.commit()

    def usuario_ja_verificado(self, codigo: str, isornot: bool):
        acao_usuario_ja_verificado = select(models.Usuario).where(
        and_(models.Usuario.codigo == codigo, models.Usuario.verificado == isornot))
        return self.session.execute(acao_usuario_ja_verificado).scalars().first()