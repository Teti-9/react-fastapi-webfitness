import secrets

def gerar_codigo_verificacao():
    return secrets.token_hex(3)