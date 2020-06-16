import { Module } from '@nestjs/common';
import { CompaniesConversationsMessagesController } from './companies-conversations-messages.controller';
import { CompaniesConversationsMessagesService } from './companies-conversations-messages.service';
import { ConversationMessageEntity as ConversationMessage } from './conversation-message.entity'
import { NetworkConversationEntity as CompanyConversation } from '../companies-conversations/company-conversation.entity'
import { ConversationsMembersEntity as ConversationMember } from '../companies-conversations-members/conversations-members.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyConversation, ConversationMember, ConversationMessage
  ])],
  controllers: [CompaniesConversationsMessagesController],
  providers: [CompaniesConversationsMessagesService]
})
export class CompaniesConversationsMessagesModule {}
