import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesChannelsRelationshipController } from './companies-channels-relationship.controller';
import { CompaniesChannelsRelationshipService } from './companies-channels-relationship.service';
import { CategoryEntity as Category } from '../companies-channels-category/category.entity'
import { CustomerEntity as Customer } from '../companies-customers/customer.entity'
import { RelationshipEntity as Relationship } from './relationship.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category, Customer, Relationship
    ])
  ],
  controllers: [CompaniesChannelsRelationshipController],
  providers: [CompaniesChannelsRelationshipService]
})
export class CompaniesChannelsRelationshipModule {}
