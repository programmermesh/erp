import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ChannelEntity } from './channel.entity'

@Entity('channel_details')
export class ChannelDetailEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string  

    @ApiProperty({ description: 'This is the details column of the channel' })
    @Column('varchar', { length: 255 })
    details: string

    /* Many channel details can belong to one channel */
    @ApiProperty({ description: 'This is the ID of the channel that is related to this details' })
    @ManyToOne( type => ChannelEntity, channel => channel.channel_details )
    channels: ChannelEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}