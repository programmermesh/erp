import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { ContractFileEntity } from '../companies-contract-files/contract-file.entity'

@Entity('companies_contracts')
export class ContractEntity extends AbstractEntity {

    @Column('varchar', { length: 255, nullable: true })
    title: string

    @Column('varchar', { length: 100, nullable: true })
    type: string

    @Column('text', { nullable: true })
    notes: string    

    @Column('text', { nullable: true })
    link: string

    @Column('varchar', { length: 300, nullable: true })
    contract_image: string

    /* Many connection groups can belong to one company */
    @ManyToOne(type => CompanyEntity, company => company.pick_decks )
    company: CompanyEntity

    /* One Contract can have many files */
    @OneToMany( type => ContractFileEntity, contract_file => contract_file.contract )
    contract_files: ContractFileEntity[]
}

