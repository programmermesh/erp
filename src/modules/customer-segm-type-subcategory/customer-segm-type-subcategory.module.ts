import { Module } from '@nestjs/common';
import { CustomerSegmTypeSubcategoryController } from './customer-segm-type-subcategory.controller';
import { CustomerSegmTypeSubcategoryService } from './customer-segm-type-subcategory.service';
import { CustomerSegTypeSubcategoryEntity as CustomerSegTypeSubcategory } from './customer-seg-type-subcategory.entity'
import { CustomerSegmentationTypeEntity as CustomerSegmentationType } from '../customer-segmentation-type/customer-segmentation-type.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([
    CustomerSegmentationType, CustomerSegTypeSubcategory
  ])],
  controllers: [CustomerSegmTypeSubcategoryController],
  providers: [CustomerSegmTypeSubcategoryService]
})
export class CustomerSegmTypeSubcategoryModule {}
