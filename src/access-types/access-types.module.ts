import { Module } from '@nestjs/common';
import { AccessTypesController } from './access-types.controller';

@Module({
  controllers: [AccessTypesController]
})
export class AccessTypesModule {}
