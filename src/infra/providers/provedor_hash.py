from passlib.context import CryptContext

senha_context = CryptContext(schemes=['bcrypt'])

def gerar_hash(texto):
    return senha_context.hash(texto)

def verificar_hash(texto, hash):
    return senha_context.verify(texto, hash)