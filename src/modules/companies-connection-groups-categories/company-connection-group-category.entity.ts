import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { ConnectionGroupsEntity } from '../companies-connection-groups/connection-groups.entity'
import { ConnectionGroupsLeadListEntity } from '../companies-connection-groups-leadlist/connection-groups-lead-list.entity'

@Entity('connection_groups_categories')
export class ConnectionGroupsCategoryEntity extends AbstractEntity {

    @Column('varchar', { length: 255 })
    name: string

    /* Many categories can belong to one group */
    @ManyToOne(type => ConnectionGroupsEntity, connection_group => connection_group.categories )
    connection_group: ConnectionGroupsEntity

    /* One category can have many leadlist companies */
    @OneToMany( type => ConnectionGroupsLeadListEntity, connection_groups_lead_list => connection_groups_lead_list.connection_group_category )
    connection_groups_lead_lists: ConnectionGroupsLeadListEntity[]
}
