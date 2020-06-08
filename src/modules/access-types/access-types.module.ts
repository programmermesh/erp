import { Module } from '@nestjs/common';
import { AccessTypesController } from './access-types.controller';
import { AccessTypesService } from './access-types.service';
import { AccessTypesEntity } from './access-types.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AccessTypesEntity]) ],
  controllers: [AccessTypesController],
  providers: [AccessTypesService]
})
export class AccessTypesModule {}
