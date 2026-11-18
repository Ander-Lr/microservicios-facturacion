import { DetalleFactura, DetalleFacturaInput } from "./detalle-factura.model.js";

export interface Factura {
    codigo: string;
    fecha: string;
    cod_cliente: number;
    total: number;
    descuento: number;
    iva: number;
    total_a_pagar: number;

    detalles_factura: DetalleFactura[];
}

// Lo que envía el cliente: los detalles llegan sin subtotal
export type FacturaInput = Omit<Factura, 'detalles_factura'> & {
    detalles_factura: DetalleFacturaInput[];
};
