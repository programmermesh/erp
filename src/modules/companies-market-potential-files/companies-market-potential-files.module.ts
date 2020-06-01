import { Module } from '@nestjs/common';
import { CompaniesMarketPotentialFilesController } from './companies-market-potential-files.controller';
import { CompaniesMarketPotentialFilesService } from './companies-market-potential-files.service';

@Module({
  controllers: [CompaniesMarketPotentialFilesController],
  providers: [CompaniesMarketPotentialFilesService]
})
export class CompaniesMarketPotentialFilesModule {}
