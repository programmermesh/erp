import { Entity, Column,ManyToOne } from 'typeorm'

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'

@Entity('performance_indicator_cost')
export class PerformanceIndicatorCostEntity extends AbstractEntity {

    @Column('bigint',{ default: 0})
    last_month: number

    @Column('bigint',{ default: 0})
    this_month: number

    @Column('bigint',{ default: 0})
    market_expenses: number

    @Column({ type: 'date' })
    date_only: Date

    /* Many Performance Indicator entity belong to one company*/
    @ManyToOne(type => CompanyEntity, company => company.performance_indicator_cost)
    company: CompanyEntity
}

