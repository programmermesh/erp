import { Module } from '@nestjs/common';
import { CompaniesConnectionsController } from './companies-networks.controller';
import { CompaniesConnectionsService } from './companies-networks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyNetworksEntity } from './company-networks.entity'
import { CompanyEntity } from '../companies/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyNetworksEntity,
    CompanyEntity
  ])],
  controllers: [CompaniesConnectionsController],
  providers: [CompaniesConnectionsService]
})
export class CompaniesConnectionsModule {}
