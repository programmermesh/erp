import { Entity, Column,ManyToOne } from 'typeorm'

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { COST_OR_REVENUE } from '../../common/enum_values'

@Entity('costs_and_revenues')
export class CostAndRevenuesEntity extends AbstractEntity {

    @Column('varchar',{ length: 255})
    title: string

    @Column('text')
    description: string

    @Column('integer')
    estimated_cost: number

    /* PENDING enum field type */
    @Column({
      type: 'enum',
      enum: COST_OR_REVENUE,
      default: COST_OR_REVENUE.cost
    })
    type: COST_OR_REVENUE

    /* Many values belong to one company*/
    @ManyToOne(type => CompanyEntity, company => company.costs_and_revenues)
    company: CompanyEntity
}
