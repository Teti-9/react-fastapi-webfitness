from fastapi import APIRouter, status, HTTPException
from src.infra.sqlalchemy.config.database import db_dependency
from src.routers.auth_utils import user_dependency
from src.schemas.schemas import Exercicio, ExercicioEdit
from src.infra.sqlalchemy.repositorios.repositorio_exercicio import RepositorioExercicio

router = APIRouter()

@router.post('/exercicios', status_code=status.HTTP_201_CREATED)
def criar_exercicio(exercicio: Exercicio, usuario: user_dependency, db: db_dependency):
    exercicio.usuario_id = usuario.id

    musculos = ['Peito', 'Costas', 'Perna', 'Ombro', 'Braço', 'Braco','Abs']
    if exercicio.musculo.capitalize() not in musculos:   
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Escolha um músculo correto!')
    
    if exercicio.musculo.capitalize() == 'Braço':
        exercicio.musculo = 'Braco'

    exercicio_criado = RepositorioExercicio(db).criar(exercicio)
    return exercicio_criado

@router.put('/exercicios/{id}')
def editar_exercicio(id: int, exercicio: ExercicioEdit, usuario: user_dependency, db: db_dependency):
    exercicio_existe = RepositorioExercicio(db).procurar_exercicio(id, usuario.id)

    if not exercicio_existe:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Não existe um exercício com esse id!')

    musculos = ['Peito', 'Costas', 'Perna', 'Ombro', 'Braço', 'Braco', 'Abs']
    if exercicio.musculo.capitalize() not in musculos:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Escolha um músculo correto!')
    
    if exercicio.musculo.capitalize() == 'Braço':
        exercicio.musculo = 'Braco'

    if exercicio.nome_exercicio == None:
        exercicio.nome_exercicio = RepositorioExercicio(db).procurar_nome_atual(id, usuario.id)

    RepositorioExercicio(db).editar(id, usuario.id, exercicio)
    return 'Exercício editado com sucesso!'


@router.delete('/exercicios/{id}')
def remover_exercicio(id: int, usuario: user_dependency, db: db_dependency):
    exercicio_existe = RepositorioExercicio(db).procurar_exercicio(id, usuario.id)

    if not exercicio_existe:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Não existe um exercício com esse id!')
    
    RepositorioExercicio(db).remover(id, usuario.id)
    return 'Exercício removido com sucesso!'