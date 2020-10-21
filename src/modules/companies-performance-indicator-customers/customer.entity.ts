import { Entity, Column,ManyToOne, ValueTransformer } from 'typeorm'

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'


export const bigint: ValueTransformer = {
    to: (entityValue: number) => entityValue,
    from: (databaseValue: string): number => parseInt(databaseValue, 10)
  }

@Entity('performance_indicator_customers')
export class PerformanceIndicatorCustomerEntity extends AbstractEntity {

    @Column('bigint',{ default: 0, transformer: [bigint]})
    last_month: number

    @Column('bigint',{ default: 0, transformer: [bigint]})
    this_month: number

    @Column('bigint',{ default: 0, transformer: [bigint]})
    acquired_customers: number

    @Column({ type: 'date' })
    date_only: Date

    /* Many Performance Indicator entity belong to one company*/
    @ManyToOne(type => CompanyEntity, company => company.performance_indicator_customers)
    company: CompanyEntity
}

