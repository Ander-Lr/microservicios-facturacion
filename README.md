# Microservicios

| Servicio | Tecnología | Puerto | Base de datos |
|---|---|---|---|
| servicio-cliente | Bun + Fastify + Sequelize | 3001 | PostgreSQL (Docker) |
| servicio-productos | Python + FastAPI + SQLAlchemy | 3002 | SQLite (`productos.db`, se crea sola) |

## 1. Base de datos (PostgreSQL para clientes)

```bash
docker compose -f docker-compose.cliente.yml up -d
```

Usa las credenciales de `servicio-cliente/src/.env` (postgres / car73h / cliente).
Si tienes otro Postgres en el puerto 5432 (p. ej. `mi_postgres`), detenlo primero.

## 2. Servicio cliente

```bash
cd servicio-cliente
bun install
bun run index.ts
```

Endpoints: `GET/POST /api/clientes`, `GET/PUT/DELETE /api/clientes/:id`

```json
{ "nombre": "Ana", "direccion": "Quito", "telefono": "0991234567" }
```

## 3. Servicio productos

```bash
cd servicio-productos
pip install -r requirements.txt
python main.py        # o: uvicorn main:app --port 3002 --reload
```

Endpoints: `GET/POST /api/productos/`, `GET/PUT/DELETE /api/productos/{codigo}`
Documentación interactiva: http://localhost:3002/docs

```json
{ "nombre": "Laptop", "descripcion": "HP", "precio": 850.5, "stock": 10 }
```
