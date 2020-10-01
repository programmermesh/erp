import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerSegmentsController } from './customer-segments.controller';
import { CustomerSegmentsService } from './customer-segments.service';
import { CustomerSegmentEntity } from './customer-segment.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerSegmentEntity])
  ],
  controllers: [CustomerSegmentsController],
  providers: [CustomerSegmentsService]
})
export class CustomerSegmentsModule {}
