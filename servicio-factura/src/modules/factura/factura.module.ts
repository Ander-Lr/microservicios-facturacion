import { Module } from '@nestjs/common';
import { FacturaController } from './factura.controller.js';
import { FacturaService } from './factura.service.js';

@Module({
  providers: [FacturaService],
  controllers: [FacturaController]
})
export class FacturaModule { }
