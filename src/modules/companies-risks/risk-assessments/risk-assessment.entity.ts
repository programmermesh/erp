import { Entity, Column, ManyToOne } from 'typeorm'
import { AbstractEntity } from '../../../common/abstract.entity'
import { CompanyEntity } from '../../companies/company.entity'
import { RISK_ASSESSTMENT_TYPE } from '../../../common/enum_values'

@Entity('risk_assessments')
export class RiskAssessmentEntity extends AbstractEntity {

    @Column('varchar', { length: 255 })
    title: string

    @Column('text', { nullable: true })
    description: string
    
    @Column({
      type: 'varchar',
      default: '',
      length: 255
    })
    type: string

    /* Many risks_assessments can belong to one company */
    @ManyToOne( type => CompanyEntity, company => company.risks_assessments )
    company: CompanyEntity
}
