import { Cliente } from "../models/cliente.model";

// Valida los datos del cliente antes de guardarlos
const validarCliente = (data: any) => {
    // El nombre es obligatorio
    if (!data.nombre || data.nombre.trim() === "") {
        throw new Error("El nombre es obligatorio");
    }

    // La dirección no puede estar vacía
    if (!data.direccion || data.direccion.trim() === "") {
        throw new Error("La dirección no puede estar vacía");
    }

    // El teléfono no puede estar vacío
    if (!data.telefono || data.telefono.trim() === "") {
        throw new Error("El teléfono no puede estar vacío");
    }

    // El teléfono debe tener exactamente 10 dígitos
    if (!/^\d{10}$/.test(data.telefono)) {
        throw new Error("El teléfono debe tener 10 dígitos");
    }
}

export const obtenerClientes = async () => {
    return Cliente.findAll();
}

export const obtenerClienteId = async (id: number) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }
    return cliente;
}

export const crearCliente = async (data: any) => {
    validarCliente(data);
    return Cliente.create(data);
}

export const actualizarCliente = async (id: number, data: any) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }
    validarCliente(data);
    return cliente.update(data);
}

export const eliminarCliente = async (id: number) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        throw new Error("Cliente no encontrado");
    }
    await cliente.destroy();
    return { mensaje: "Eliminado Correctamente" };
}
