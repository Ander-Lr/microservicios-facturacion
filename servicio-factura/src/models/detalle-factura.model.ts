export interface DetalleFactura {
    codigo: number;
    cod_factura: number;
    cod_producto: number;
    cantidad: number;
    subtotal: number;
}

// Lo que envía el cliente: el subtotal se calcula en el servicio
export type DetalleFacturaInput = Omit<DetalleFactura, 'subtotal'>;
