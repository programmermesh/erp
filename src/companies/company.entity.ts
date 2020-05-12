import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsOptional,
  IsNotEmpty
  } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
      description: 'This is the name of the company'
    })
    @Column('varchar', { length: 500, unique: true })
    name: string

    @ApiProperty()
    @Column('varchar', { length: 200, nullable: true })
    address: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    country: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    city: string

    @ApiProperty({
      description: 'This is the email of the company. Will be unique'
    })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column('varchar',{ length: 255, unique: true })
    email: string

    @ApiProperty()
    @Column('varchar', { length: 100 })
    phone: string

    @ApiProperty()
    @Column('varchar', { nullable: true })
    website: string

    @ApiProperty({
      description: 'This is the size of the company',
      minimum:1,
      default: 1
    })
    @Column('int', { nullable: true})
    customer_size: number

    @ApiProperty({
      description: 'This is the minimum investment amount of the company looking for ',
      minimum:1,
      default: 1
    })
    @IsOptional({ always: true })
    @Column('int', { nullable: true})
    minimum_investment_amount?: number

    @ApiProperty({
      description: 'This is the maximum investment amount of the company looking for ',
      minimum:1,
      default: 1
    })
    @IsOptional({ always: true })
    @Column('int', { nullable: true})
    max_investment_amount?: number

    @ApiProperty({
      description: 'This is a determining column set to true if the company is interested in getting investments.',
      default: true
    })
    @Column({ type: 'boolean', default: true })
    interested_in_investment?: boolean

    @ApiProperty({
      description: 'This is a field where the company states its vision',
      default: ""
    })
    @Column('text', { nullable: true})
    vision?: string

    @ApiProperty({
      description: 'This is a field where the company states its mission',
      default: ""
    })
    @Column('text', { nullable: true})
    mission?: string

    @ApiProperty({
      description: 'This is a field where the company states the date it was established',
      default: ""
    })
    @Column('date', { nullable: true})
    date_of_establishment?: string

    @ApiProperty({
      description: 'This is a field that will have the URI to the company logo',
      default: ""
    })
    @Column('text', { nullable: true})
    logo?: string

    @ApiProperty({
      description: 'This is a field that will have the URI to the company profile photo',
      default: ""
    })
    @Column('text', { nullable: true})
    profile_photo: string

    @ApiProperty({
      description: 'This is a field will have the company elevator pitch ',
      default: ""
    })
    @Column('text', { nullable: true})
    elevator_pitch?: string

    @ApiProperty({
      description: 'This is a field that will have the URI to the company facebook page',
      default: ""
    })
    @Column('text', { nullable: true})
    facebook?: string

    @ApiProperty({
      description: 'This is a field that will have the URI to the company linkedin page',
      default: ""
    })
    @Column('text', { nullable: true})
    linkedin?: string

    @ApiProperty({
      description: 'This is a field that will have the URI to the company twitter page',
      default: ""
    })
    @Column('text', { nullable: true})
    twitter?: string

    @ApiProperty({
      description: 'This is a field that will have the URI to the company youtube page',
      default: ""
    })
    @Column('text', { nullable: true})
    youtube?: string

    @ApiProperty({
      description: 'This is a field that will have the URI to the company other page',
      default: ""
    })
    @Column('text', { nullable: true})
    others?: string

    @ApiProperty({
      description: 'This field will have the company\'s minimum valuation ',
      minimum:1,
      default: 1
    })
    @Column('int', { nullable: true})
    min_valuation?: number

    @ApiProperty({
      description: 'This field will have the company\'s maximum valuation ',
      minimum:1,
      default: 1
    })
    @Column('int', { nullable: true})
    max_valuation?: number

    @ApiProperty({
      description: 'This field will have the description for the company valuation',
      default: ""
    })
    @Column('text', { nullable: true})
    valuation_description?: string

    @ApiProperty({
      description: 'This field will describe the company type'
    })
    @Column({ type: 'varchar', length: 200, nullable: true})
    company_type?: string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    create_at?: Date

    @ApiProperty({
      description: 'This will be the ID of the user that created the company entity'
    })
    @Column({ type: 'varchar', length: 200 })
    created_by?: string

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at?: Date

    @ApiProperty({
      description: 'This will be the ID of the user that last updated the company entity'
    })
    @Column({ type: 'varchar', length: 200, nullable: true })
    updated_by?: string


}
