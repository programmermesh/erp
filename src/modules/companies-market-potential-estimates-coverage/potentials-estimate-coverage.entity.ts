import { Entity, Column, ManyToOne } from 'typeorm'
import { MONTHS_OF_THE_YEAR } from '../../common/enum_values'
import { AbstractEntity } from '../../common/abstract.entity'
import { MarketPotentialEntity } from '../companies-market-potentials/market-potential.entity'

@Entity('potentials_estimate_coverage')
export class PotentialsEstimateCoverageEntity extends AbstractEntity {
    @Column('integer', { default: 1})
    estimated_market_coverage: number

    @Column({
      type: 'enum',
      enum: MONTHS_OF_THE_YEAR,
      default: MONTHS_OF_THE_YEAR.January
    })
    month: MONTHS_OF_THE_YEAR

    /* PENDING: USE DATE for this */
    @Column('integer', { default: 2000})
    year: number

    @Column('integer', { default: 0 })
    percentage_complete: number

    /* Many potentials_estimate_coverage can belong to one market potential entry */
    @ManyToOne( type => MarketPotentialEntity, market_potential => market_potential.potentials_estimate_coverages, { onDelete: 'CASCADE' } )
    market_potentials: MarketPotentialEntity
}