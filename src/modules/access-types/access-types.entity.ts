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
import { CompanyTeamMembersEntity } from '../companies/company-team-members.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('access_types')
export class AccessTypesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the unique access type name'})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255, unique: true})
    name: string

    /* One access_type can be assgned to many team members */
    @OneToMany(type => CompanyTeamMembersEntity, team_member => team_member.access_type )
    team_members: CompanyTeamMembersEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date
}
