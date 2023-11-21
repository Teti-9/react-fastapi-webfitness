from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from src.infra.sqlalchemy.config.database import Base

class Usuario(Base):
    __tablename__ = 'usuario'

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(30), nullable=False)
    senha = Column(String(200), nullable=False)
    email = Column(String(30), nullable=False, unique=True)
    codigo = Column(String(10), nullable=False)
    verificado = Column(Boolean, nullable=False)

    exercicios = relationship('Exercicio', back_populates='usuario')

class Exercicio(Base):
    __tablename__ = 'exercicios'

    id = Column(Integer, primary_key=True, index=True)
    musculo = Column(String(30), nullable=False)
    nome_exercicio = Column(String(30), nullable=False)
    carga = Column(Integer, nullable=False)
    repeticoes = Column(Float(30), nullable=False)
    data = Column(DateTime(timezone=True), server_default=func.now())
    usuario_id = Column(Integer, ForeignKey('usuario.id', name='fake_user'))
    
    usuario = relationship('Usuario', back_populates='exercicios')