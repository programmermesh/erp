import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
  } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { CompanyEntity } from '../companies/company.entity'
import { CompanyTeamMembersEntity } from '../companies/company-team-members.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('roles')
export class RolesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the name of the role '})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255})
    name: string

    /* Many roles can belong to ony one company */
    @ApiProperty({ description: 'This is the ID of the company that created that roal' })
    @ManyToOne(type => CompanyEntity, company => company.roles)
    company: CompanyEntity

    /* One role can have many team members assigned to it*/
    @OneToMany( type => CompanyTeamMembersEntity, member_role => member_role.role )
    team_members: CompanyTeamMembersEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}
