import { Module } from '@nestjs/common';
import { BusinessSectorsController } from './business-sectors.controller';
import { BusinessSectorsService } from './business-sectors.service';
import { BusinessSectorsEntity } from './business-sectors.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([BusinessSectorsEntity] )],
  controllers: [BusinessSectorsController],
  providers: [BusinessSectorsService]
})
export class BusinessSectorsModule {}
