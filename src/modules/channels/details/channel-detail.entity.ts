import { Entity, Column, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../../common/abstract.entity'
import { ChannelEntity } from '../channel.entity'

@Entity('channel_details')
export class ChannelDetailEntity extends AbstractEntity {

    @Column('varchar', { length: 255 })
    details: string

    /* Many channel details can belong to one channel */
    @ManyToOne( type => ChannelEntity, channel => channel.channel_details )
    channels: ChannelEntity
}