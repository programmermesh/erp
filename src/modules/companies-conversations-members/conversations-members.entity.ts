import { Entity, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { NetworkConversationEntity } from '../companies-conversations/company-conversation.entity'
import { CompanyEntity } from '../companies/company.entity'
import { ConversationMessageEntity } from '../companies-conversations-messages/conversation-message.entity'
 
@Entity('conversations_members')
export class ConversationsMembersEntity extends AbstractEntity {

    /* Many network_conversation can belong to one company */
    @ManyToOne( type => NetworkConversationEntity, network_conversation => network_conversation.conversation_members)
    network_conversations: NetworkConversationEntity

    /* Many conversations_member entry can be part of a single company network */
    @ManyToOne( type => CompanyEntity, company => company.conversation_members )
    company: CompanyEntity

    /* One company in a conversation group can write many messages */
    @OneToMany( type => ConversationMessageEntity, conversation_message => conversation_message.sent_by )
    conversation_message: ConversationMessageEntity[]
}