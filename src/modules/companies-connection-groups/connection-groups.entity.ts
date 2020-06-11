import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { ConnectionGroupsLeadListEntity } from '../companies-connection-groups-leadlist/connection-groups-lead-list.entity'

@Entity('connection_groups')
export class ConnectionGroupsEntity extends AbstractEntity {

    @Column('varchar', { length: 255, nullable: true })
    name: string
    
    @Column('varchar', { length: 300, nullable: true })
    connection_group_cover_photo: string

    /* Many connection groups can belong to one company */
    @ManyToOne(type => CompanyEntity, company => company.connection_groups )
    company: CompanyEntity

    /* One connection group can have many leads in it */
    @OneToMany( type => ConnectionGroupsLeadListEntity, connection_groups_lead_list => connection_groups_lead_list.connection_group )
    connection_groups_lead_lists: ConnectionGroupsLeadListEntity[]
}
