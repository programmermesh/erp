import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { MarketPotentialsFileEntity } from '../companies-market-potential-files/market-potentials-file.entity'
import { CompanyEntity } from '../companies/company.entity'
import { PotentialsEstimateCoverageEntity } from '../companies-market-potential-estimates-coverage/potentials-estimate-coverage.entity'
import { MarketPotentialsCustomerEntity } from '../companies-market-potential-customers/market-potentials-customer.entity'

@Entity('market_potentials')
export class MarketPotentialEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title'})
    @Column('varchar', { length: 255})
    title: string

    @ApiProperty({ description: 'This is the market size'})
    @Column('integer', { default: 1})
    market_size: number

    @ApiProperty({ description: 'This is the current coverage size'})
    @Column('integer', { default: 1})
    current_coverage_size: string

    @ApiProperty({ description: 'This is the description of the market potentials'})
    @Column('text', { nullable: true })
    description: string

    /* Many files can belong to one market potential entry */
    @ApiProperty({ description: 'This is the ID of the company the market potentials belongs to' })
    @ManyToOne( type => CompanyEntity, company => company.market_potentials )
    company: CompanyEntity

    /* One Market potetial can have many files */
    @OneToMany( type => MarketPotentialsFileEntity, market_potentials_file => market_potentials_file.market_potentials )
    market_potentials_files: MarketPotentialsFileEntity[]
    
    /* One market potential can have many estimate coverage*/
    @OneToMany( type => PotentialsEstimateCoverageEntity, potentials_estimate_coverage => potentials_estimate_coverage.market_potentials )
    potentials_estimate_coverages: PotentialsEstimateCoverageEntity[]

    /* One market_potential entity can have many customers */
    @OneToMany( type => MarketPotentialsCustomerEntity, market_potentials_customer => market_potentials_customer.market_potentials )
    market_potentials_customers: MarketPotentialsCustomerEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}