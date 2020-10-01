import { Entity, Column, ManyToOne } from 'typeorm'
import { CONNECTED_HUB_OR_INCUBATOR } from '../../common/enum_values'
import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'

@Entity('companies_connected_hubs')
export class ConnectedHubEntity extends AbstractEntity {

    @Column('varchar', { length: 255, nullable: true })
    title: string

    @Column({
        type: 'enum',
        enum: CONNECTED_HUB_OR_INCUBATOR,
        default: CONNECTED_HUB_OR_INCUBATOR.hub
    })
    connected_to: CONNECTED_HUB_OR_INCUBATOR

    @Column('text', { nullable: true })
    description: string    

    @Column('text', { nullable: true })
    links: string

    /* Many connection groups can belong to one company */
    @ManyToOne(type => CompanyEntity, company => company.connected_hubs )
    company: CompanyEntity
}


