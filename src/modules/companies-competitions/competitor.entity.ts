import { Entity, Column, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../common/abstract.entity'
import { CompanyEntity } from '../companies/company.entity'
import { COMPETITORS_IMPORTANCE_LEVEL } from '../../common/enum_values'

@Entity('competitors')
export class CompetitorEntity extends AbstractEntity {

    @Column('varchar', { length: 255 })
    name: string

    @Column('varchar', { length: 255 })
    type: string

    @Column('varchar', { length: 255 })
    point_of_differentiation: string

    @Column('text')
    details: string

    @Column({
        type: 'enum',
        enum: COMPETITORS_IMPORTANCE_LEVEL,
        default: COMPETITORS_IMPORTANCE_LEVEL.moderate
    })
    importance_level: COMPETITORS_IMPORTANCE_LEVEL

    @Column('varchar', { length: 255, nullable: true })
    website: string

    /* Many competitors can be link to one company */
    @ManyToOne( type => CompanyEntity, company => company.competitors )
    company: CompanyEntity
}