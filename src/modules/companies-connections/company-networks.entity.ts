import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CompanyEntity } from '../companies/company.entity'
import { ConversationsMembersEntity } from '../../network-connections/conversations-members.entity'
import { COMPANY_NETWORK_INVITES_STATUS } from '../../common/enum_values'

@Entity('company_networks')
export class CompanyNetworksEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ApiProperty({ description: 'This is the role that the company will have in the network' })
    @Column('varchar', { length: 100 })
    role: string

    @ApiProperty({ description: 'This is the message that will be sent to a company ' })
    @Column('text')
    message: string

    @ApiProperty({ description: 'This is the status of the invite the company sent' })
    @Column({
      type: 'enum',
      enum: COMPANY_NETWORK_INVITES_STATUS,
      default: COMPANY_NETWORK_INVITES_STATUS.pending
    })
    invitation_status: COMPANY_NETWORK_INVITES_STATUS

    /* Many network_connections can belong to one company */
    @ApiProperty({ description: 'This is the ID  of the company that owns the network' })
    @ManyToOne( type => CompanyEntity, company => company.company_networks)
    company: CompanyEntity

    /* Many connected_company_id can refer to one company id */
    @ApiProperty({ description: 'This is the ID of the company invited to be part of the company network to' })
    @ManyToOne( type => CompanyEntity, company => company.company_to_company_network)
    invited_company: CompanyEntity

    /* One company in a network can be a member of many conversations */
    @OneToMany( type => ConversationsMembersEntity, conversation_member => conversation_member.company_networks )
    conversations_members: ConversationsMembersEntity[]

    /*PENDING CONNECTION TO THE INVESTORS table*/

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}