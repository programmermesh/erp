import { Entity, Column, ManyToOne } from 'typeorm'

import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'

@Entity('company_values')
export class CompanyValuesEntity extends AbstractEntity {

    @Column('varchar',{ length: 255})
    title: string

    @Column('text')
    summary: string

    @Column('varchar', { length: 20 } )
    color_code: string

    /* Many values belong to one company*/
    @ManyToOne(type => CompanyEntity, company => company.values)
    company: CompanyEntity
}
