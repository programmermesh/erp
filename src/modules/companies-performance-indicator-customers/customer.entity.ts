import { Entity, Column,ManyToOne } from 'typeorm'

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'

@Entity('performance_indicator_customers')
export class PerformanceIndicatorCustomerEntity extends AbstractEntity {

    @Column('bigint',{ default: 0})
    last_month: number

    @Column('bigint',{ default: 0})
    this_month: number

    @Column('bigint',{ default: 0})
    acquired_customers: number

    @Column({ type: 'date' })
    date_only: Date

    /* Many Performance Indicator entity belong to one company*/
    @ManyToOne(type => CompanyEntity, company => company.performance_indicator_customers)
    company: CompanyEntity
}

