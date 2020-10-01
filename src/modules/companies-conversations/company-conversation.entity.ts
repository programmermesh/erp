import { Entity,ManyToOne, OneToMany, Column } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { ConversationMessageEntity } from '../companies-conversations-messages/conversation-message.entity'
import { ConversationsMembersEntity } from '../companies-conversations-members/conversations-members.entity'

@Entity('network_conversations')
export class NetworkConversationEntity extends AbstractEntity {

    @Column({ type:'text', nullable: true })
    title: string

    /* Many network_conversation can belong to one company */
    @ManyToOne( type => CompanyEntity, company => company.network_converstaions)
    company: CompanyEntity

    /* A conversation can have many messages */
    @OneToMany( type => ConversationMessageEntity, conversation_messages => conversation_messages.network_conversations)
    conversation_messages: ConversationMessageEntity[]

    /* One conversation can be viewed by many members in a group */
    @OneToMany( type => ConversationsMembersEntity, conversation_member => conversation_member.network_conversations)
    conversation_members: ConversationsMembersEntity[]
}