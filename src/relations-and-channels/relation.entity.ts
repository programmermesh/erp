import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ChannelEntity } from './channel.entity'
import { CompanyRelationEntity } from './company-relation.entity'

@Entity('relations')
export class RelationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string  

    @ApiProperty({ description: 'This is the title of the relation' })
    @Column('varchar', { length: 255 })
    title: string

    /*One relation can have many channels*/
    @OneToMany( type => ChannelEntity, channel => channel.relations )
    channels: ChannelEntity[]

    /*One relation can have many company*/
    @OneToMany( type => CompanyRelationEntity, company_relation => company_relation.relations )
    company_relations: CompanyRelationEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}