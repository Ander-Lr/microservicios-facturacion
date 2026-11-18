import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { FacturaService } from './factura.service.js';
import type { Factura, FacturaInput } from '../../models/factura.model.js';
import type { DetalleFacturaInput } from '../../models/detalle-factura.model.js';

@Controller('factura')
export class FacturaController {
  constructor(private readonly facturaService: FacturaService) {}

  @Post()
  crear(@Body() data: FacturaInput) {
    return this.facturaService.crear(data);
  }

  @Get()
  listar() {
    return this.facturaService.listar();
  }

  @Get(':codigo')
  consultar(@Param('codigo') codigo: string) {
    return this.facturaService.consultar(codigo);
  }

  @Patch(':codigo')
  actualizar(@Param('codigo') codigo: string, @Body() data: Partial<Factura>) {
    return this.facturaService.actualizar(codigo, data);
  }

  @Delete(':codigo')
  eliminar(@Param('codigo') codigo: string) {
    return this.facturaService.eliminar(codigo);
  }

  // Detalle factura
  @Post(':codigo/detalles')
  agregarDetalle(@Param('codigo') codigo: string, @Body() data: DetalleFacturaInput) {
    return this.facturaService.agregarDetalle(codigo, data);
  }

  @Patch(':codigo/detalles/:codDetalle')
  actualizarDetalle(
    @Param('codigo') codigo: string,
    @Param('codDetalle', ParseIntPipe) codDetalle: number,
    @Body() data: Partial<DetalleFacturaInput>,
  ) {
    return this.facturaService.actualizarDetalle(codigo, codDetalle, data);
  }

  @Delete(':codigo/detalles/:codDetalle')
  eliminarDetalle(
    @Param('codigo') codigo: string,
    @Param('codDetalle', ParseIntPipe) codDetalle: number,
  ) {
    return this.facturaService.eliminarDetalle(codigo, codDetalle);
  }
}
