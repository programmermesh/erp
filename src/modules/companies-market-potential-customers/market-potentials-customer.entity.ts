import { Entity, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { MarketPotentialEntity } from '../companies-market-potentials/market-potential.entity'
import { CustomerEntity } from '../companies-customers/customer.entity'

@Entity('market_potentials_customers')
export class MarketPotentialsCustomerEntity extends AbstractEntity {

    /* Many market_potentials_customers can belong to one market potential entity */
    @ManyToOne( type => MarketPotentialEntity, market_potential => market_potential.market_potentials_customers )
    market_potentials: MarketPotentialEntity

    /* Many market_potentials_customers can belong to one customer entity */
    @ManyToOne( type => CustomerEntity, customer => customer.market_potentials_customers )
    customers: CustomerEntity
}
