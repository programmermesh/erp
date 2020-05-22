import { Module } from '@nestjs/common';
import { CustomerSegmentsController } from './customer-segments.controller';

@Module({
  controllers: [CustomerSegmentsController]
})
export class CustomerSegmentsModule {}
