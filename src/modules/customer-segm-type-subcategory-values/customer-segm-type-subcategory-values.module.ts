import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerSegmTypeSubcategoryValuesController } from './customer-segm-type-subcategory-values.controller';
import { CustomerSegmTypeSubcategoryValuesService } from './customer-segm-type-subcategory-values.service';
import { CustSegTypesSubcategoriesValueEntity as CustSegTypesSubcategoriesValue } from './cust-seg-types-subcategories-value.entity'
import { CompanyCustomerSegmentDetailsEntity as CompanyCustomerSegmentDetails } from '../companies-customer-segment-details/company-customer-segment-details.entity'
import { CustomerSegTypeSubcategoryEntity as CustomerSegTypeSubcategory } from '../customer-segm-type-subcategory/customer-seg-type-subcategory.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyCustomerSegmentDetails, 
    CustSegTypesSubcategoriesValue, 
    CustomerSegTypeSubcategory
  ])] ,
  controllers: [CustomerSegmTypeSubcategoryValuesController],
  providers: [CustomerSegmTypeSubcategoryValuesService]
})
export class CustomerSegmTypeSubcategoryValuesModule {}
