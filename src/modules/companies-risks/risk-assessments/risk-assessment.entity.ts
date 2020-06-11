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
      type: 'enum',
      enum: RISK_ASSESSTMENT_TYPE
    })
    type: RISK_ASSESSTMENT_TYPE

    /* Many risks_assessments can belong to one company */
    @ManyToOne( type => CompanyEntity, company => company.risks_assessments )
    company: CompanyEntity
}
