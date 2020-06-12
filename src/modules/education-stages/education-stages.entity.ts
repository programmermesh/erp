import {Entity, Column, OneToMany } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CustomerEntity } from '../companies-customers/customer.entity'

@Entity('education_stages')
export class EducationStagesEntity extends AbstractEntity {

    @Column('varchar',{ length: 255})
    title: string

    @Column('varchar',{ length: 255, nullable: true})
    description: string

    /* One educations stage can be asssigned to many customers */
    @OneToMany(type => CustomerEntity, customer => customer.education_stage)
    customers: CustomerEntity[]

}
