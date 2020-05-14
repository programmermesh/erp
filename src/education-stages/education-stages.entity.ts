import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { CustomerEntity } from '../customers/customer.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('education_stages')
export class EducationStagesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the ttle/value of the education_stage '})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255})
    title: string

    @ApiProperty({ description: 'The summary description'})
    @Column('varchar',{ length: 255})
    description: string

    /* One educations stage can be asssigned to many customers */
    @OneToMany(type => CustomerEntity, customer => customer.education_stage)
    customers: CustomerEntity[]

    /* One role can have many team members assigned to it*/
    //@OneToMany( type => CompanyTeamMembersEntity, member_role => member_role.role )
    //team_members: CompanyTeamMembersEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}