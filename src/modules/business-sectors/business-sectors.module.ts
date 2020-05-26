import { Module } from '@nestjs/common';
import { BusinessSectorsController } from './business-sectors.controller';

@Module({
  controllers: [BusinessSectorsController]
})
export class BusinessSectorsModule {}
