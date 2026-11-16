from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.database import obtener_db
from schemas.producto import ProductoCreate, ProductoResponse
from controllers import producto_controller

router = APIRouter(
    prefix = "/productos",
    tags = ["productos"]
)

@router.get("/", response_model=list[ProductoResponse])
def listar_productos(db:Session = Depends(obtener_db)):
    return producto_controller.obtener_producto(db)

@router.get("/{codigo}", response_model = ProductoResponse)
def obtener(codigo: int, db: Session = Depends(obtener_db)):
    producto = producto_controller.obtener_producto_id(db, codigo)
    if not producto:
        raise HTTPException(404,"Producto no encontrado")
    return producto

@router.post("/", response_model=ProductoResponse)
def crear(producto: ProductoCreate, db: Session = Depends(obtener_db)):
    return producto_controller.crear_producto(db, producto)

@router.put("/{codigo}", response_model=ProductoResponse)
def actualizar(codigo: int, datos: ProductoCreate, db: Session = Depends(obtener_db)):
    producto = producto_controller.actualizar_producto(db, codigo, datos)
    if not producto:
        raise HTTPException(404,"Producto no encontrado")
    return producto


@router.delete("/{codigo}")
def eliminar(codigo: int, db: Session = Depends(obtener_db)):
    producto = producto_controller.eliminar_producto(db, codigo)
    if not producto:
        raise HTTPException(404,"Producto no encontrado")
    return { "mensaje":"Producto Eliminado con Exito" }