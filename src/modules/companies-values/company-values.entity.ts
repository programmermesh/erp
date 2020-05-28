import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { CompanyEntity } from '../companies/company.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('company_values')
export class CompanyValuesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the title/value of the company value '})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255})
    title: string

    @ApiProperty({ description: 'The summary description'})
    @Column('text')
    summary: string

    @ApiProperty({ description: 'This is the color code assigned to the company_value'})
    @Column('varchar', { length: 20 } )
    color_code: string

    /* Many values belong to one company*/
    @ApiProperty({ description: 'This is the ID of the company the value belongs to' })
    @ManyToOne(type => CompanyEntity, company => company.values)
    company: CompanyEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}