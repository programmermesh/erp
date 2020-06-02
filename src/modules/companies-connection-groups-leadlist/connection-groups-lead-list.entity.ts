import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { ConnectionGroupsEntity } from '../companies-connection-groups/connection-groups.entity'
import { LeadListEntity } from '../companies-lead-list/lead-list.entity'

@Entity('connection_groups_lead_list')
export class ConnectionGroupsLeadListEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    /* Many connections_group_lead_list entry can belong to one group */
    @ApiProperty({ description: 'This is the id of the connection group' })
    @ManyToOne(type => ConnectionGroupsEntity, connection_group => connection_group.connection_groups_lead_lists )
    connection_group: ConnectionGroupsEntity

    /* A lead list can be in many connection groups  */
    @ApiProperty({ description: 'This is the id of the lead list' })
    @ManyToOne(type => LeadListEntity, lead_list => lead_list.connection_groups_lead_lists)
    lead_list: LeadListEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}