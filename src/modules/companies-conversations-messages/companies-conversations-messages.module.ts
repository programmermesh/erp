import { Module } from '@nestjs/common';
import { CompaniesConversationsMessagesController } from './companies-conversations-messages.controller';

@Module({
  controllers: [CompaniesConversationsMessagesController]
})
export class CompaniesConversationsMessagesModule {}
