import { Entity, Column, ManyToOne } from 'typeorm'

import { MarketPotentialEntity } from '../companies-market-potentials/market-potential.entity'
import { AbstractEntity } from '../../common/abstract.entity'
@Entity('market_potentials_files')
export class MarketPotentialsFileEntity extends AbstractEntity{

    @Column('varchar', { length: 500})
    market_potential_file_url: string

    /* Many files can belong to one market potential entry */
    @ManyToOne( type => MarketPotentialEntity, market_potential => market_potential.market_potentials_files )
    market_potentials: MarketPotentialEntity
}