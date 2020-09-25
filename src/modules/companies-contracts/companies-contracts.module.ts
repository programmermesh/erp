import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesContractsController } from './companies-contracts.controller';
import { CompaniesContractsService } from './companies-contracts.service';
import { ContractEntity as CompanyContract } from './contract.entity'
import { CompanyEntity as Company } from '../companies/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyContract, Company
  ])],
  controllers: [CompaniesContractsController],
  providers: [CompaniesContractsService]
})
export class CompaniesContractsModule {}
