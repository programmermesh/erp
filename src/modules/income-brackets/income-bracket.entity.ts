import { Entity, Column, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CustomerEntity } from '../companies-customers/customer.entity'

@Entity('income_brackets')
export class IncomeBracketEntity extends AbstractEntity{

    @Column('varchar',{ length: 255})
    title: string

    @Column('numeric')
    minimum_income: number

    @Column('numeric')
    maximum_income: number

    /* One income bracket can have MANY customers*/
    @OneToMany( type => CustomerEntity, customer => customer.income_bracket )
    customers: CustomerEntity[]
}
