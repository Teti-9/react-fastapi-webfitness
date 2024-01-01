from fastapi import APIRouter, status, HTTPException
from src.infra.sqlalchemy.repositorios.repositorio_dieta import RepositorioDieta
from src.infra.sqlalchemy.models.models import Macros
from src.routers.auth_utils import user_dependency

router = APIRouter()

@router.post('/dieta')
def criar_dieta(dieta: Macros, usuario: user_dependency):
    dieta.usuario_id = usuario.id

    try:
        RepositorioDieta.visualizar_dieta(usuario.id)
    except TypeError:
        RepositorioDieta.criar_dieta(dieta)
        return 'Dieta criada com sucesso!'

    if RepositorioDieta.visualizar_dieta(usuario.id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Já existe uma dieta associada a esse usuário.')

@router.put('/dieta')
def editar_dieta(dieta: Macros, usuario: user_dependency):
    dieta.usuario_id = usuario.id

    dieta_calorias_carbs = dieta.carbs * 4
    dieta_calorias_protein = dieta.protein * 4
    dieta_calorias_fat = dieta.fat * 9

    dieta.calorias = dieta_calorias_carbs + dieta_calorias_protein + dieta_calorias_fat
    RepositorioDieta.editar_dieta(dieta, usuario.id)
    return 'Dieta editada com sucesso!'

@router.get('/dieta')
def visualizar_dieta(usuario: user_dependency):
    dieta = RepositorioDieta.visualizar_dieta(usuario.id)
    return dieta

@router.delete('/dieta')
def zerar_dieta(dieta: Macros, usuario: user_dependency):
    dieta.usuario_id = usuario.id
    RepositorioDieta.zerar_dieta(dieta, usuario.id)
    return 'Valores da dieta foram resetados com sucesso!'