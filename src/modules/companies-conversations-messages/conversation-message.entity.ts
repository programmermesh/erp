import { Entity, Column, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { NetworkConversationEntity } from '../companies-conversations/company-conversation.entity'
import { ConversationsMembersEntity } from '../companies-conversations-members/conversations-members.entity'

@Entity('conversations_messages')
export class ConversationMessageEntity extends AbstractEntity {

    @Column('text', { nullable: false })
    message: string

    /* Many network_conversation can belong to one company */
    @ManyToOne( type => NetworkConversationEntity, network_conversation => network_conversation.conversation_messages)
    network_conversations: NetworkConversationEntity

    @ManyToOne( type => ConversationsMembersEntity, conversations_members => conversations_members.conversation_message )
    sent_by: ConversationsMembersEntity
}
