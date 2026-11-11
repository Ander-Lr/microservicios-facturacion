import type { FastifyInstance } from "fastify";
import { obtenerClientes, obtenerClienteId, crearCliente, actualizarCliente, eliminarCliente } from "../controllers/cliente.controller";

export const clienteRouter = (app: FastifyInstance) => {
    app.get("/clientes", obtenerClientes);

    app.get("/clientes/:id", async (req, res) => {
        try {
            const { id } = req.params as any;
            return await obtenerClienteId(id);
        } catch (error) {
            console.log("Error al obtener todos los clientes")
            res.code(400).send({ "mensaje": "Error en obtener clientes" })
        }
    });

    app.post("/clientes", async (req, res) => {
        try {
            const cliente = await crearCliente(req.body);
            return res.code(201).send(cliente);
        } catch (error) {
            console.log("Error al crear el cliente", error);
            res.code(400).send({ "mensaje": (error as Error).message ?? "Error al crear cliente" });
        }
    });

    app.put("/clientes/:id", async (req, res) => {
        try {
            const { id } = req.params as any;
            const cliente = req.body;
            return await actualizarCliente(Number(id), cliente);
        } catch (error) {
            console.log("Error al actualizar el cliente", error);
            res.code(400).send({ "mensaje": (error as Error).message ?? "Error al actualizar cliente" });
        }
    });

    app.delete("/clientes/:id", async (req, res) => {
        try {
            const { id } = req.params as any;
            return await eliminarCliente(Number(id));
        } catch (error) {
            console.log("Error al eliminar el cliente", error);
            res.code(400).send({ "mensaje": (error as Error).message ?? "Error al eliminar cliente" });
        }
    });
}
