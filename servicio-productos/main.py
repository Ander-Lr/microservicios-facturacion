from time import thread_time
from fastapi import FastAPI

from config.database import engine, Base
from router.producto_router import router as producto_router


app = FastAPI(
    title="Servicio Producto",
    description = "Servicio desarrollado en Clases de Arquitectura",
    version = "1.0"
)

Base.metadata.create_all(bind=engine)
app.include_router(producto_router, prefix="/api")

@app.get("/")
def inicio():
    return { "mensaje":" servicio producto ejecutandose"}