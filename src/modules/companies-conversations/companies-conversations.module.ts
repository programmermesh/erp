import { Module } from '@nestjs/common';
import { CompaniesConversationsController } from './companies-conversations.controller';

@Module({
  controllers: [CompaniesConversationsController]
})
export class CompaniesConversationsModule {}
