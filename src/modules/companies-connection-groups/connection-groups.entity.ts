import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CompanyEntity } from '../companies/company.entity'
import { ConnectionGroupsLeadListEntity } from '../companies-connection-groups-leadlist/connection-groups-lead-list.entity'

@Entity('connection_groups')
export class ConnectionGroupsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the name of the group'})
    @Column('varchar', { length: 255, nullable: true })
    name: string

    @ApiProperty({ description: 'This is the url for the group photo'})
    @Column('varchar', { length: 300, nullable: true })
    cover_photo: string

    /* Many connection groups can belong to one company */
    @ApiProperty({ description: 'This is the id of the company the group is associated to' })
    @ManyToOne(type => CompanyEntity, company => company.connection_groups )
    company: CompanyEntity

    /* One connection group can have many leads in it */
    @OneToMany( type => ConnectionGroupsLeadListEntity, connection_groups_lead_list => connection_groups_lead_list.connection_group )
    connection_groups_lead_lists: ConnectionGroupsLeadListEntity[]


    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}