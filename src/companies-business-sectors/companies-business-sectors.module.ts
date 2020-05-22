import { Module } from '@nestjs/common';
import { CompaniesBusinessSectorsController } from './companies-business-sectors.controller';

@Module({
  controllers: [CompaniesBusinessSectorsController]
})
export class CompaniesBusinessSectorsModule {}
