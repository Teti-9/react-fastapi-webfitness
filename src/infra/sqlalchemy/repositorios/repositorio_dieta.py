from src.infra.sqlalchemy.config.database import collection_name
from src.routers.auth_utils import list_serial

class RepositorioDieta:

    def __init__(self):
        pass

    def criar_dieta(dieta):
        collection_name.insert_one(dict(dieta))
    
    def editar_dieta(dieta, id: int):
        calorias = collection_name.find_one({"usuario_id": id}, ['calorias'])
        carbs = collection_name.find_one({"usuario_id": id}, ['carbs'])
        protein = collection_name.find_one({"usuario_id": id}, ['protein'])
        fat = collection_name.find_one({"usuario_id": id}, ['fat'])

        dieta.calorias = calorias['calorias'] + dieta.calorias
        dieta.carbs = carbs['carbs'] + dieta.carbs
        dieta.protein = protein['protein'] + dieta.protein
        dieta.fat = fat['fat'] + dieta.fat

        collection_name.find_one_and_update({"usuario_id": id}, {"$set": dict(dieta)})

    def visualizar_dieta(id: int):
        dieta = list_serial(collection_name.find_one({"usuario_id": id}))
        return dieta

    def zerar_dieta(dieta, id: int):
        dieta.calorias = 0
        dieta.carbs = 0
        dieta.protein = 0
        dieta.fat = 0
        collection_name.find_one_and_update({"usuario_id": id}, {"$set": dict(dieta)})