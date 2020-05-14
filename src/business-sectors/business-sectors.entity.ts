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
import { CompanyBusinessSectorsEntity } from '../companies/company-business-sectors.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('business_sectors')
export class BusinessSectorsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the unique business sector name '})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255, unique: true})
    name: string    
    
    @ApiProperty({ description: 'Simple summary of what the field is' })
    @Column('varchar', { length: 255, nullable: true })
    @ApiPropertyOptional()
    description: string

    /* One business_sector can be in many company_business_sectors */
    @OneToMany( type => CompanyBusinessSectorsEntity, business_sector => business_sector.business_sector )
    company: CompanyBusinessSectorsEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}
