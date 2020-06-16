import { Module } from '@nestjs/common';
import { CompaniesRelationsController } from './companies-relations.controller';
import { CompaniesRelationsService } from './companies-relations.service';
import { CompanyEntity as Company } from '../companies/company.entity'
import { CompanyRelationEntity as CompanyRelation } from './company-relation.entity'
import { RelationEntity as Relation } from '../relations/relation.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    Company,
    Relation,
    CompanyRelation
  ])],
  controllers: [CompaniesRelationsController],
  providers: [CompaniesRelationsService]
})
export class CompaniesRelationsModule {}
