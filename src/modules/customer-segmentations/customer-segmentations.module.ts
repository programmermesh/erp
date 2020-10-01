import { Module } from '@nestjs/common';
import { CustomerSegmentationsService } from './customer-segmentations.service';
import { CustomerSegmentationsController } from './customer-segmentations.controller';
import { CustomerSegmentationsEntity as CustomerSegmentations } from './customer-segmentations.entity'
import { SegmentationsEntity as Segmentations } from '../segmentations/segmentations.entity'
import { CustomerEntity as Customer } from '../companies-customers/customer.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerSegmentations, Segmentations, Customer])
  ],
  providers: [CustomerSegmentationsService],
  controllers: [CustomerSegmentationsController]
})
export class CustomerSegmentationsModule {}
