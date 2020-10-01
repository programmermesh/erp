import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesConnectedHubController } from './companies-connected-hub.controller';
import { CompaniesConnectedHubService } from './companies-connected-hub.service';
import { ConnectedHubEntity as ConnectedHub } from './connected-hub.entity'
import { CompanyEntity as Company } from '../companies/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ ConnectedHub, Company ])],
  controllers: [CompaniesConnectedHubController],
  providers: [CompaniesConnectedHubService]
})
export class CompaniesConnectedHubModule {}
