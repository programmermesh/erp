import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CompaniesConversationsMessagesController } from './companies-conversations-messages.controller';
import { CompaniesConversationsMessagesService } from './companies-conversations-messages.service';
import { ConversationMessageEntity as ConversationMessage } from './conversation-message.entity'
import { NetworkConversationEntity as CompanyConversation } from '../companies-conversations/company-conversation.entity'
import { ConversationsMembersEntity as ConversationMember } from '../companies-conversations-members/conversations-members.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesMiddleware } from './messages.middleware'
import { CompanyEntity as Company } from '../companies/company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([
    CompanyConversation, ConversationMember, ConversationMessage, Company
  ])],
  controllers: [CompaniesConversationsMessagesController],
  providers: [CompaniesConversationsMessagesService]
})
export class CompaniesConversationsMessagesModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(MessagesMiddleware)
      .forRoutes(CompaniesConversationsMessagesController)
  }
}
