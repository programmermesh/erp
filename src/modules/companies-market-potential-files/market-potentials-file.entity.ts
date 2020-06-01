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

@Entity('market_potentials_files')
export class MarketPotentialsFileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the name of the file'})
    @Column('varchar', { length: 255})
    filename: string

    @ApiProperty({ description: 'This is the name of the url to the file'})
    @Column('varchar', { length: 500})
    fileurl: string

    /* Many files can belong to one market potential entry */
    @ApiProperty({ description: 'This is the ID of the market potential entity'})
    @ManyToOne( type => MarketPotentialEntity, market_potential => market_potential.market_potentials_files )
    market_potentials: MarketPotentialEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}