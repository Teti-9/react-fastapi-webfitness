from fastapi import APIRouter, status, HTTPException
from src.infra.sqlalchemy.config.database import db_dependency
from src.routers.auth_utils import user_dependency, enviar_codigo_verificacao
from src.schemas.schemas import Usuario, LoginData, LoginSucesso, NovaSenha
from src.infra.sqlalchemy.repositorios.repositorio_usuario import RepositorioUsuario
from src.infra.sqlalchemy.repositorios.repositorio_exercicio import RepositorioExercicio
from src.infra.providers import provedor_hash, provedor_token
from src.infra.providers.provedor_verificacao import gerar_codigo_verificacao
from jose import JWTError

router = APIRouter()

@router.post('/signup', status_code=status.HTTP_201_CREATED)
def signup(usuario: Usuario, db: db_dependency):
    usuario_ja_existe = RepositorioUsuario(db).procurar_email(usuario.email)

    if usuario_ja_existe:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email já cadastrado!')

    usuario.codigo = gerar_codigo_verificacao()
    usuario.senha = provedor_hash.gerar_hash(usuario.senha)
    usuario.email = usuario.email.lower()
    # enviar_codigo_verificacao(usuario.email, usuario.codigo, 'verificação')

    usuario_criado = RepositorioUsuario(db).criar(usuario)

    return usuario_criado

@router.post('/verificacao/{codigo}')
def verificacao(codigo: str, db: db_dependency):
    codigo_existe = RepositorioUsuario(db).procurar_codigo(codigo)

    if not codigo_existe:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Código Incorreto!')
    
    usuario_ja_verificado = RepositorioUsuario(db).usuario_ja_verificado(codigo, True)

    if usuario_ja_verificado:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='Usuário já verificado!')


    usuario_verificado = RepositorioUsuario(db).validar_codigo(codigo)
    return usuario_verificado

@router.post('/recuperar/{email}')
def recuperar(email: str, db: db_dependency):
    usuario_ja_existe = RepositorioUsuario(db).procurar_email(email)
    codigo = gerar_codigo_verificacao()

    if not usuario_ja_existe:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email não existe!')
    
    global recuperar_email
    recuperar_email = email

    token = provedor_token.criar_token_de_acesso({'sub': codigo})
    print(token)
    # enviar_codigo_verificacao(email, token, 'recuperação de senha')

@router.post('/recuperarconfirm/{codigo}')
def codigorecuperar(codigo: str):
    try:
        recuperar_valido = provedor_token.verificar_token_de_acesso(codigo)
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Token expirado!')
    return recuperar_valido

@router.post('/novasenha')
def novasenha(usuario: NovaSenha, db: db_dependency):
    global recuperar_email
    usuario.senha = provedor_hash.gerar_hash(usuario.senha)

    RepositorioUsuario(db).mudar_senha(usuario, recuperar_email)

    recuperar_email = ''
    
    return 'Senha atualizada.'

@router.post('/login')
def login(login_data: LoginData, db: db_dependency):
    email = login_data.email.lower()
    senha = login_data.senha

    usuario = RepositorioUsuario(db).procurar_email(email)

    if not usuario:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Email Incorreto!')
    
    senha_valida = provedor_hash.verificar_hash(senha, usuario.senha)

    if not senha_valida:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Senha Incorreta!')

    token = provedor_token.criar_token_de_acesso({'sub': usuario.email})
    return LoginSucesso(token_de_acesso=token, tipo_do_token='bearer')

@router.get('/me/{musculo}')
def me(musculo: str, usuario: user_dependency, db: db_dependency):
    perfil = RepositorioExercicio(db).listar(usuario.id, musculo.capitalize())
    return perfil