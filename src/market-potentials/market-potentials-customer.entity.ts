import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { MarketPotentialEntity } from './market-potential.entity'
import { CustomerEntity } from '../customers/customer.entity'

@Entity('market_potentials_customers')
export class MarketPotentialsCustomerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    /* Many market_potentials_customers can belong to one market potential entity */
    @ApiProperty({ description: 'This is the ID of the market potential entity'})
    @ManyToOne( type => MarketPotentialEntity, market_potential => market_potential.market_potentials_customers )
    market_potentials: MarketPotentialEntity

    /* Many market_potentials_customers can belong to one customer entity */
    @ApiProperty({ description: 'This is the ID of the customer entity'})
    @ManyToOne( type => CustomerEntity, customer => customer.market_potentials_customers )
    customers: CustomerEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}