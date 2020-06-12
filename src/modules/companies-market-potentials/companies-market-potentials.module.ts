import { Module } from '@nestjs/common';
import { CompaniesMarketPotentialsController } from './companies-market-potentials.controller';
import { CompaniesMarketPotentialsService } from './companies-market-potentials.service';
import { CompanyEntity} from '../companies/company.entity'
import { UserEntity } from '../users/user.entity'
import { MarketPotentialEntity } from './market-potential.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    MarketPotentialEntity,
    UserEntity,
    CompanyEntity
  ])],
  controllers: [CompaniesMarketPotentialsController],
  providers: [CompaniesMarketPotentialsService]
})
export class CompaniesMarketPotentialsModule {}
