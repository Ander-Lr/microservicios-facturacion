from pydantic import BaseModel, ConfigDict


class Producto(BaseModel):
    nombre: str
    descripcion: str
    precio: float
    stock: int


class ProductoCreate(Producto):
    pass


class ProductoResponse(Producto):
    model_config = ConfigDict(from_attributes=True)
    codigo: int
