from sqlalchemy import select, update, delete, and_
from sqlalchemy.orm import Session
from src.schemas import schemas
from src.infra.sqlalchemy.models import models
import datetime

class RepositorioExercicio:

    def __init__(self, session: Session):
        self.session = session

    def criar(self, exercicio: schemas.Exercicio):
        exercicio_banco_de_dados = models.Exercicio(musculo = exercicio.musculo.capitalize(),
                                                    nome_exercicio = exercicio.nome_exercicio.title(),
                                                    carga = exercicio.carga,
                                                    repeticoes = exercicio.repeticoes,
                                                    data = exercicio.data,
                                                    usuario_id = exercicio.usuario_id)

        self.session.add(exercicio_banco_de_dados)
        self.session.commit()
        self.session.refresh(exercicio_banco_de_dados)
        return exercicio_banco_de_dados
    
    def listar(self, id: int, musculo: str):
        acao_listar = select(models.Exercicio).where(and_(models.Exercicio.usuario_id == id, models.Exercicio.musculo == musculo.capitalize()))
        return self.session.execute(acao_listar).scalars().all()

    def procurar_exercicio(self, id: int, user_id: int):
        acao_procurar_exercicio = select(models.Exercicio).where(
            and_(models.Exercicio.id == id, models.Exercicio.usuario_id == user_id))
        return self.session.execute(acao_procurar_exercicio).scalars().first()

    def editar(self, id: int, user_id: int, exercicio: schemas.Exercicio):
        acao_editar_exercicio = update(models.Exercicio).where(
            and_(models.Exercicio.id == id, models.Exercicio.usuario_id == user_id)).values(
                                                    musculo = exercicio.musculo.capitalize(),
                                                    nome_exercicio = exercicio.nome_exercicio.title(),
                                                    carga = exercicio.carga,
                                                    repeticoes = exercicio.repeticoes,
                                                    data = datetime.datetime.now(),
                                                    usuario_id = user_id
                                                    )

        self.session.execute(acao_editar_exercicio)
        self.session.commit()

    def remover(self, id: int, user_id: int):
        acao_remover_exercicio = delete(models.Exercicio).where(
            and_(models.Exercicio.id == id, models.Exercicio.usuario_id == user_id))

        self.session.execute(acao_remover_exercicio)
        self.session.commit()