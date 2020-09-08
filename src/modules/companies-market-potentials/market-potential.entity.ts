import {  Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { MarketPotentialsFileEntity } from '../companies-market-potential-files/market-potentials-file.entity'
import { CompanyEntity } from '../companies/company.entity'
import { PotentialsEstimateCoverageEntity } from '../companies-market-potential-estimates-coverage/potentials-estimate-coverage.entity'
import { MarketPotentialsCustomerEntity } from '../companies-market-potential-customers/market-potentials-customer.entity'

@Entity('market_potentials')
export class MarketPotentialEntity extends AbstractEntity {

    @Column('varchar', { length: 255})
    title: string

    @Column('integer', { default: 0})
    market_size: number

    @Column('integer', { default: 0})
    current_market_coverage: number

    @Column('text', { nullable: true })
    description: string

    /* Many files can belong to one market potential entry */
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
}