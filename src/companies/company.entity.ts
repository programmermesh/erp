import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsOptional,
  IsNotEmpty
  } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { UserEntity } from '../users/user.entity'
import { CompanyTeamMembersEntity } from './company-team-members.entity'
import { RolesEntity } from '../roles/roles.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({ description: 'This is the name of the company' })
    @Column('varchar', { length: 500, unique: true })
    name: string

    @ApiProperty()
    @ApiPropertyOptional()
    @Column('varchar', { length: 200, nullable: true })
    address: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    country: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    city: string

    @ApiProperty({ description: 'This is the email of the company. Will be unique' })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255, unique: true })
    email: string

    @ApiProperty()
    @Column('varchar', { length: 100 })
    phone: string

    @ApiProperty({ description: 'This is the email of the company website URI' })
    @ApiPropertyOptional()
    @Column('varchar', { nullable: true })
    website: string

    @ApiProperty({ description: 'This is the size of the company', minimum:1, default: 1 })
    @ApiPropertyOptional()
    @Column('int', { nullable: true})
    customer_size: number

    @ApiProperty({ description: 'This is the minimum investment amount of the company looking for ', minimum:1, default: 1 })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @Column('int', { nullable: true})
    minimum_investment_amount?: number

    @ApiProperty({ description: 'This is the maximum investment amount of the company looking for ', minimum:1, default: 1 })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @Column('int', { nullable: true})
    max_investment_amount?: number

    @ApiProperty({ description: 'This is a determining column set to true if the company is interested in getting investments.', default: true })
    @Column({ type: 'boolean', default: true })
    @ApiPropertyOptional()
    interested_in_investment?: boolean

    @ApiProperty({ description: 'This is a field where the company states its vision', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    vision?: string

    @ApiProperty({ description: 'This is a field where the company states its mission', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    mission?: string

    @ApiProperty({
      description: 'This is a field where the company states the date it was established',
      default: ""
    })
    @Column('date', { nullable: true})
    date_of_establishment?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company logo', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    logo?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company profile photo', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    profile_photo: string

    @ApiProperty({ description: 'This is a field will have the company elevator pitch ', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    elevator_pitch?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company facebook page', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    facebook?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company linkedin page', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    linkedin?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company twitter page', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    twitter?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company youtube page', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    youtube?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company other page', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    others?: string

    @ApiProperty({
      description: 'This field will have the company\'s minimum valuation ', minimum:1, default: 1 })
    @ApiPropertyOptional()
    @Column('int', { nullable: true})
    min_valuation?: number

    @ApiProperty({ description: 'This field will have the company\'s maximum valuation ', minimum:1, default: 1 })
    @ApiPropertyOptional()
    @Column('int', { nullable: true})
    max_valuation?: number

    @ApiProperty({ description: 'This field will have the description for the company valuation', default: "" })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    valuation_description?: string

    @ApiProperty({ description: 'This field will describe the company type' })
    @ApiPropertyOptional()
    @Column({ type: 'varchar', length: 200, nullable: true})
    company_type?: string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    create_at?: Date

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

    @ApiProperty({ description: 'This will be the ID of the user that last updated the company entity' })
    @ApiPropertyOptional()
    @Column({ type: 'varchar', length: 200, nullable: true })
    updated_by?: string
    
    /* one Company can only be created by one user  */
    @OneToOne(type => UserEntity)
    @JoinColumn()
    created_by: UserEntity
    
    /* One company can have many team members */
    @OneToMany( type => CompanyTeamMembersEntity, team_member => team_member.company )
    team_members: CompanyTeamMembersEntity[]

    /* One company can have many roles*/
    @OneToMany( type => RolesEntity, role => role.company )
    roles: RolesEntity[]
}
