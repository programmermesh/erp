import {  Entity, Column, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { MONTHS_OF_THE_YEAR } from '../../common/enum_values'

@Entity('company_milestones')
export class CompanyMilestonesEntity extends AbstractEntity {

    @Column('varchar', { length: 255, nullable: true })
    title: string

    @Column('text', { nullable: true })
    description: string

    @Column('date', {nullable: true })
    achievement_date: Date

    @Column('boolean', { default: false})
    milestone_achieved: boolean

    /* Many connection groups can belong to one company */
    @ManyToOne(type => CompanyEntity, company => company.connection_groups )
    company: CompanyEntity
}
