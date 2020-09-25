import { Entity, Column, ManyToOne } from 'typeorm'

import { ContractEntity } from '../companies-contracts/contract.entity'
import { AbstractEntity } from '../../common/abstract.entity'
@Entity('contract_files')
export class ContractFileEntity extends AbstractEntity{

    @Column('varchar', { nullable: true })
    name: string

    @Column('varchar', { length: 500})
    contract_file_url: string

    /* Many files can belong to one market potential entry */
    @ManyToOne( type => ContractEntity, contract => contract.contract_files, { onDelete: 'CASCADE' } )
    contract: ContractEntity
}