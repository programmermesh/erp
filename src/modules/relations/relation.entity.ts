import { Entity, Column, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { ChannelEntity } from '../channels/channel.entity'
import { CompanyRelationEntity } from '../companies-relations/company-relation.entity'

@Entity('relations')
export class RelationEntity extends AbstractEntity {

    @Column('varchar', { length: 255, unique: true })
    title: string

    /*One relation can have many channels*/
    @OneToMany( type => ChannelEntity, channel => channel.relations )
    channels: ChannelEntity[]

    /*One relation can have many company*/
    @OneToMany( type => CompanyRelationEntity, company_relation => company_relation.relations )
    company_relations: CompanyRelationEntity[]
}