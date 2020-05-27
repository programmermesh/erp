import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional} from '@nestjs/swagger'
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { CompanyBusinessStagesEntity } from '../companies-business-sectors/company-business-stages.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('business_stages')
export class BusinessStagesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the unique business stage name '})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255, unique: true})
    name: string
    
    @ApiProperty({ description: 'Simple summary of what the field is' })
    @Column('varchar', { length: 255, nullable: true })
    @ApiPropertyOptional()
    description: string

    /* One business_stage can have many company_business_stages assigned to it */
    @OneToMany( type => CompanyBusinessStagesEntity, business_stage => business_stage.company )
    companies: CompanyBusinessStagesEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}

/**
 * Idea stage
 * MVP stage (Minimum variable product)
 * Testing Stage
 * Validation stage
 * Operational stage
 * Scaling stage
 */
