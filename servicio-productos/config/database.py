from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine("sqlite:///productos.db", connect_args={"check_same_thread": False})

sessionLoca = sessionmaker(autoflush=False, autocommit=False, bind=engine)
Base = declarative_base()


def obtener_db():
    db = sessionLoca()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
