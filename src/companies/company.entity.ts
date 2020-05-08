import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import {
    IsOptional,
    IsString,
    MaxLength,
    IsNotEmpty,
    IsEmail,
    IsBoolean,
    ValidateNested,
    IsNumber,
    Min
  } from 'class-validator';
import { Type } from 'class-transformer';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty()
    @Column('varchar', { length: 500, unique: true })
    name: string

    @ApiProperty()
    @Column()
    address: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    country: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    city: string

    @ApiProperty()
    // @IsOptional({ groups: [UPDATE] }) // validate on PATCH only
    // @IsNotEmpty({ groups: [CREATE] }) // validate on POST only
    // @IsString({ always: true }) // validate on both
    // @MaxLength(255, { always: true })
    // @IsEmail({ require_tld: false }, { always: true })
    @Column('varchar',{ length: 255, nullable: false, unique: true })
    email: string

    @ApiProperty()
    @Column('varchar', { length: 100 })
    phone: string

    @ApiProperty()
    @Column('varchar', { nullable: true })
    website: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    customer_segment: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    business_stage: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    business_section: string

    @ApiProperty()
    @Column('varchar', { length: 200 })
    connected_to_hub_or_incubator: string

    @ApiProperty()
    @Column('numeric')
    @Min(0)
    @IsNumber()
    investment_amount: string

    @CreateDateColumn()
    create_at: Date

    @UpdateDateColumn()
    updated_at: Date

}
