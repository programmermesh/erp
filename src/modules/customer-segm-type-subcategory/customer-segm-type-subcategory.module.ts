import { Module } from '@nestjs/common';
import { CustomerSegmTypeSubcategoryController } from './customer-segm-type-subcategory.controller';
import { CustomerSegmTypeSubcategoryService } from './customer-segm-type-subcategory.service';

@Module({
  controllers: [CustomerSegmTypeSubcategoryController],
  providers: [CustomerSegmTypeSubcategoryService]
})
export class CustomerSegmTypeSubcategoryModule {}
