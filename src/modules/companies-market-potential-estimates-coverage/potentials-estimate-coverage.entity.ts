import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { MarketPotentialEntity } from '../companies-market-potentials/market-potential.entity'

@Entity('potentials_estimate_coverage')
export class PotentialsEstimateCoverageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the estimated market coverage'})
    @Column('integer', { default: 1})
    estimated_market_coverage: number

    /* PENDING :: use enum values */
    @ApiProperty({ description: 'This is the month Between 01-12'})
    @Column('integer', { default: 1})
    month: number

    /* PENDING: USE DATE for this */
    @ApiProperty({ description: 'This is the month Between 1900-current year'})
    @Column('integer', { default: 2000})
    year: number

    /* Many potentials_estimate_coverage can belong to one market potential entry */
    @ApiProperty({ description: 'This is the ID of the market potential entity'})
    @ManyToOne( type => MarketPotentialEntity, market_potential => market_potential.potentials_estimate_coverages )
    market_potentials: MarketPotentialEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}