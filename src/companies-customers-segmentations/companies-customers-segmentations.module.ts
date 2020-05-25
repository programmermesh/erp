import { Module } from '@nestjs/common';
import { CompaniesCustomersSegmentationsController } from './companies-customers-segmentations.controller';

@Module({
  controllers: [CompaniesCustomersSegmentationsController]
})
export class CompaniesCustomersSegmentationsModule {}
