import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
 } from 'typeorm'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { IsOptional, IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { CompanyTeamMembersEntity } from '../companies-team-members/company-team-members.entity'

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string    

    @ApiProperty({ description: 'This is the email of the company. Will be unique'})
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255, unique: true })
    email: string

    @ApiProperty({ description: 'This is the user first name and last name' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @Column('varchar', { length: 255 ,nullable: true})
    firstname_lastname?: string

    @ApiProperty({ description: 'This is the user surname' })
    @IsOptional({ groups: [CREATE] })
    @ApiPropertyOptional()
    @Column('varchar', { length: 255 ,nullable: true})
    surname: string

    @ApiProperty({ description: 'This is the user password' })
    @IsNotEmpty({ groups: [CREATE] })
    @IsOptional({ groups: [UPDATE] })
    @Exclude()
    @Column('varchar', { length: 255 })
    password: string

    @ApiProperty({ description: 'This is the user URI to the user profile photo' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @Column('varchar', { length: 255 ,nullable: true})
    profile_photo: string

    @ApiProperty({ description: 'This is the user country of residence' })
    @IsOptional({ always: true })
    @Column('varchar', { length: 255 ,nullable: true})
    country?: string

    @ApiProperty({ description: 'This is the user city of residence' })
    @IsOptional({ always: true })
    @Column('varchar', { length: 255 ,nullable: true})
    city?: string

    @ApiProperty({ description: 'This is the user facebook URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @Column('varchar', { length: 255 ,nullable: true})
    facebook: string

    @ApiProperty({  description: 'This is the user linkedin URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @Column('varchar', { length: 255 ,nullable: true})
    linkedin: string

    @ApiProperty({ description: 'This is the user twitter URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @Column('varchar', { length: 255 ,nullable: true})
    twitter: string

    @ApiProperty({  description: 'This is the user youtube URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @Column('varchar', { length: 255 ,nullable: true})
    youtube: string

    @ApiProperty({ description: 'This is the user other URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @Column('text', { nullable: true})
    others: string

    @ApiProperty({ description: 'This is a field used to activate or disable a user .', default: true })
    @Column({ type: 'boolean', default: true })
    is_active?: boolean    

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
    
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

    @ApiProperty({ description: 'This will be the ID of the user that last updated the company entity' })
    @Column({ type: 'varchar', length: 200, nullable: true })
    updated_by?: string   

    /* A USER can be a part of MANY company team members group */
    @OneToMany( type => CompanyTeamMembersEntity, team_member => team_member.user )
    team_members: CompanyTeamMembersEntity

}
