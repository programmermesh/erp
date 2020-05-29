import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ChannelDetailEntity } from './details/channel-detail.entity'
import { RelationEntity } from '../relations/relation.entity'

@Entity('channels')
export class ChannelEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string  

    @ApiProperty({ description: 'This is the name of the channel' })
    @Column('varchar', { length: 255 })
    name: string

    /* One channel can have many channel details */
    @OneToMany( type => ChannelDetailEntity, channel_detail => channel_detail.channels )
    channel_details: ChannelDetailEntity[]

    /* Many channels can belong to one relation */
    @ApiProperty({ description: 'This is the ID of the relation the channel belong to' })
    @ManyToOne( type => RelationEntity, relation => relation.channels )
    relations: RelationEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}