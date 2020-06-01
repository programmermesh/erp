import { Module } from '@nestjs/common';
import { CustomerSegmTypeSubcategoryValuesController } from './customer-segm-type-subcategory-values.controller';
import { CustomerSegmTypeSubcategoryValuesService } from './customer-segm-type-subcategory-values.service';

@Module({
  controllers: [CustomerSegmTypeSubcategoryValuesController],
  providers: [CustomerSegmTypeSubcategoryValuesService]
})
export class CustomerSegmTypeSubcategoryValuesModule {}
