import { Module } from '@nestjs/common';
import { CustomerSegmentationTypeController } from './customer-segmentation-type.controller';
import { CustomerSegmentationTypeService } from './customer-segmentation-type.service';

@Module({
  controllers: [CustomerSegmentationTypeController],
  providers: [CustomerSegmentationTypeService]
})
export class CustomerSegmentationTypeModule {}
