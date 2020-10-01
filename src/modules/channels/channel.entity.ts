import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { ChannelDetailEntity } from './details/channel-detail.entity'
import { RelationEntity } from '../relations/relation.entity'

@Entity('channels')
export class ChannelEntity extends AbstractEntity {
    @Column('varchar', { length: 255 })
    name: string

    /* One channel can have many channel details */
    @OneToMany( type => ChannelDetailEntity, channel_detail => channel_detail.channels )
    channel_details: ChannelDetailEntity[]

    /* Many channels can belong to one relation */
    @ManyToOne( type => RelationEntity, relation => relation.channels )
    relations: RelationEntity
}
