import {  Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CHANNELS_PHASES } from '../../common/enum_values'

import { CompanyEntity } from '../companies/company.entity'
import { CategoryEntity } from '../companies-channels-category/category.entity'

@Entity('companies_channels')
export class ChannelsEntity extends AbstractEntity {
    
    @Column('varchar',{ length: 255})
    title: string

    @Column('text', { nullable: true })
    description: string

    @Column({
        type: 'enum',
        enum: CHANNELS_PHASES,
        default: CHANNELS_PHASES.awareness
    })
    phase: CHANNELS_PHASES
        
    /* Many Channels can belong to one company */
    @ManyToOne(type => CompanyEntity , company => company.channels )
    company: CompanyEntity

    @OneToMany(type => CategoryEntity ,categories => categories.channel)
    categories: CategoryEntity[]
}
