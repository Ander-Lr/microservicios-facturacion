from sqlalchemy.orm import Session
from models.producto import Producto
from schemas.producto import ProductoCreate


def obtener_producto(db: Session):
    return db.query(Producto).all()


def obtener_producto_id(db: Session, codigo: int):
    return db.query(Producto).filter(Producto.codigo == codigo).first()


# crear producto
def crear_producto(db: Session, producto: ProductoCreate):
    nuevo_producto = Producto(
        nombre=producto.nombre,
        descripcion=producto.descripcion,
        precio=producto.precio,
        stock=producto.stock,
    )
    db.add(nuevo_producto)
    db.commit()
    db.refresh(nuevo_producto)
    return nuevo_producto


def actualizar_producto(db: Session, codigo: int, datos: ProductoCreate):
    producto = obtener_producto_id(db, codigo)
    if not producto:
        return None
    for campo, valor in datos.model_dump().items():
        setattr(producto, campo, valor)
    db.commit()
    db.refresh(producto)
    return producto


def eliminar_producto(db: Session, codigo: int):
    producto = obtener_producto_id(db, codigo)
    if not producto:
        return None
    db.delete(producto)
    db.commit()
    return producto
