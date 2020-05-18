import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CompanyEntity } from '../companies/company.entity'

@Entity('risk_assessments')
export class RiskAssessmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title of the risk assessment'})
    @Column('varchar', { length: 255 })
    title: string

    @ApiProperty({ description: 'This is the description of the risk assessment'})
    @Column('text', { nullable: true })
    description: string

    /* PENDING :: use of enum values ['strength', 'weakness', 'opportunities', 'weakness']*/
    @ApiProperty({ description: 'This is the type of the risk assessment'})
    @Column('varchar', { length: 255, default:'strength', nullable: true})
    assessment_type: string

    /* Many risks_assessments can belong to one company */
    @ApiProperty({ description: 'This is the ID of the company that the risk assessment belongs to' })
    @ManyToOne( type => CompanyEntity, company => company.risks_assessments )
    company: CompanyEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}