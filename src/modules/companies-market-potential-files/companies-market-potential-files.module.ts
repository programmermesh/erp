import { Module } from '@nestjs/common';
import { CompaniesMarketPotentialFilesController } from './companies-market-potential-files.controller';
import { CompaniesMarketPotentialFilesService } from './companies-market-potential-files.service';
import { MarketPotentialsFileEntity } from './market-potentials-file.entity'
import { MarketPotentialEntity } from '../companies-market-potentials/market-potential.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    MarketPotentialEntity,
    MarketPotentialsFileEntity
  ])],
  controllers: [CompaniesMarketPotentialFilesController],
  providers: [CompaniesMarketPotentialFilesService]
})
export class CompaniesMarketPotentialFilesModule {}
