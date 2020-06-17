import { Module } from '@nestjs/common';
import { CustomerSegmentationTypeController } from './customer-segmentation-type.controller';
import { CustomerSegmentationTypeService } from './customer-segmentation-type.service';
import { CustomerSegmentationTypeEntity as CustomerSegmentationType  } from './customer-segmentation-type.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ CustomerSegmentationType ])],
  controllers: [CustomerSegmentationTypeController],
  providers: [CustomerSegmentationTypeService]
})
export class CustomerSegmentationTypeModule {}
