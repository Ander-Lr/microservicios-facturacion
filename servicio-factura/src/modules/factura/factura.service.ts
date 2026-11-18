import { Injectable, NotFoundException, ConflictException, ServiceUnavailableException } from '@nestjs/common';
import { db } from '../../prisma/db.js';
import { Factura, FacturaInput } from '../../models/factura.model.js';
import { DetalleFactura, DetalleFacturaInput } from '../../models/detalle-factura.model.js';

const PRODUCTOS_URL = process.env['PRODUCTOS_URL'] ?? 'http://localhost:3002/api/productos';

@Injectable()
export class FacturaService {
    async crear(data: FacturaInput) {
        const existe = await db.orm.Factura.where({ codigo: data.codigo }).first();
        if (existe) {
            throw new ConflictException('Codigo ya existente');
        }
        const detalles = await Promise.all(data.detalles_factura.map((d) => this.calcularDetalle(d)));
        return db.orm.Factura.create({ ...data, fecha: new Date(data.fecha), detalles_factura: detalles });
    }

    async listar() {
        return db.orm.Factura.all().toArray();
    }

    async consultar(codigo: string) {
        const factura = await db.orm.Factura.where({ codigo }).first();
        if (!factura) {
            throw new NotFoundException('Factura no encontrada');
        }
        return factura;
    }

    async actualizar(codigo: string, data: Partial<Factura>) {
        const { codigo: _codigo, ...resto } = data;
        const cambios: Record<string, unknown> = { ...resto };
        if (data.fecha) {
            cambios.fecha = new Date(data.fecha);
        }
        const factura = await db.orm.Factura.where({ codigo: codigo }).update(cambios);
        if (!factura) {
            throw new NotFoundException('Factura no encontrada');
        }
        return factura;
    }

    async eliminar(codigo: string) {
        await this.consultar(codigo);
        await db.orm.Factura.where({ codigo }).delete();
    }

    //Detalle factura
    async agregarDetalle(codigo: string, data: DetalleFacturaInput) {
        const factura = await this.consultar(codigo);
        const existe = factura.detalles_factura.some((d) => d.codigo === data.codigo);
        if (existe) {
            throw new ConflictException('Codigo de detalle ya existente');
        }
        const detalle = await this.calcularDetalle(data);
        return db.orm.Factura.where({ codigo }).update((u) => [
            u.detalles_factura.push(detalle),
        ]);
    }

    // subtotal = cantidad * precio del producto (consultado en servicio-productos)
    private async calcularDetalle(data: DetalleFacturaInput): Promise<DetalleFactura> {
        const precio = await this.obtenerPrecio(data.cod_producto);
        return { ...data, subtotal: data.cantidad * precio };
    }

    private async obtenerPrecio(codProducto: number): Promise<number> {
        let respuesta: Response;
        try {
            respuesta = await fetch(`${PRODUCTOS_URL}/${codProducto}`);
        } catch {
            throw new ServiceUnavailableException('Servicio de productos no disponible');
        }
        if (respuesta.status === 404) {
            throw new NotFoundException(`Producto ${codProducto} no encontrado`);
        }
        if (!respuesta.ok) {
            throw new ServiceUnavailableException('Error al consultar el servicio de productos');
        }
        const producto = (await respuesta.json()) as { precio: number };
        return producto.precio;
    }

    // Actualizar detalle
    // PATCH
    async actualizarDetalle(codigo: string, codDetalle: number, data: Partial<DetalleFacturaInput>) {
        const factura = await this.consultar(codigo);
        const actual = factura.detalles_factura.find((d) => d.codigo === codDetalle);
        if (!actual) {
            throw new NotFoundException('Detalle no encontrado');
        }
        const { codigo: _codigo, ...cambios } = data;
        // Se recalcula el subtotal con la cantidad/producto nuevos (o los que ya tenía)
        const actualizado = await this.calcularDetalle({
            codigo: actual.codigo,
            cod_factura: cambios.cod_factura ?? actual.cod_factura,
            cod_producto: cambios.cod_producto ?? actual.cod_producto,
            cantidad: cambios.cantidad ?? actual.cantidad,
        });
        const detalles = factura.detalles_factura.map((d) => (d.codigo === codDetalle ? actualizado : d));
        return db.orm.Factura.where({ codigo }).update({ detalles_factura: detalles });
    }

    async eliminarDetalle(codigo: string, codDetalle: number) {
        const factura = await this.consultar(codigo);
        const existe = factura.detalles_factura.some((d) => d.codigo === codDetalle);
        if (!existe) {
            throw new NotFoundException('Detalle no encontrado');
        }
        return db.orm.Factura.where({ codigo }).update((u) => [
            u.detalles_factura.pull({ codigo: codDetalle }),
        ]);
    }
}
