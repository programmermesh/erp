import { Module } from '@nestjs/common';
import { CompaniesConnectionsController } from './companies-connections.controller';

@Module({
  controllers: [CompaniesConnectionsController]
})
export class CompaniesConnectionsModule {}
