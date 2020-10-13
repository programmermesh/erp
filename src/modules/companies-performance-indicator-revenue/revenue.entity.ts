import { Entity, Column,ManyToOne } from 'typeorm'

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'

@Entity('performance_indicator_revenue')
export class PerformanceIndicatorRevenueEntity extends AbstractEntity {

    @Column('bigint',{ default: 0})
    last_month: number

    @Column('bigint',{ default: 0})
    this_month: number

    @Column('bigint',{ default: 0})
    generated_revenue: number

    @Column('bigint',{ default: 0})
    reserve_from_previous_period: number

    @Column('bigint',{ default: 0})
    funding: number

    @Column({ type: 'date' })
    date_only: Date

    /* Many Performance Indicator entity belong to one company*/
    @ManyToOne(type => CompanyEntity, company => company.performance_indicator_revenues)
    company: CompanyEntity
}
