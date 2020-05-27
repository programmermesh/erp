import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { CrudValidationGroups } from '@nestjsx/crud';
import { CompanyEntity } from '../companies/company.entity'
import { BusinessStagesEntity } from '../business-stages/business-stages.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('company_business_stages')
export class CompanyBusinessStagesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string 
    
    /* Many companies_business_sector can belong to one business_sector*/
    @ApiProperty({ description: 'This will be the ID of the business_sector the field is assigned to' })
    @ManyToOne( type => BusinessStagesEntity, business_stage => business_stage.companies )
    business_stage: BusinessStagesEntity
        
    /* Many customer_segments can belong to one company */
    @ApiProperty({ description: 'This will be the ID of the company the business_stage belongs to' })
    @ManyToOne(type => CompanyEntity , company => company.business_stages )
    company: CompanyEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

}