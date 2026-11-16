import { Module } from '@nestjs/common';
import { FacturaService } from './factura.service.js';

@Module({
  providers: [FacturaService]
})
export class FacturaModule {}
