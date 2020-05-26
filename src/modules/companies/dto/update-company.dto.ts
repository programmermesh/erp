import { IsString, IsOptional, IsNotEmpty, IsEmail, IsNumber, IsBoolean} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateCompanyDto {
    @ApiProperty({ description: 'This is the name of the company' })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly address: string

    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly country: string

    @ApiProperty()
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly city: string

    @ApiProperty({ description: 'This is the email of the company. Will be unique' })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsEmail() readonly email: string

    @ApiProperty({ description: "Companies email address" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly phone: string

    @ApiProperty({ description: 'This is the wesite of the company website URI' })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly website: string

    @ApiProperty({ description: 'This is the size of the company', minimum:1, default: 1 })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsNumber() readonly customer_size: number

    @ApiProperty({ description: 'This is the minimum investment amount of the company looking for ', minimum:1, default: 1 })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsNumber() readonly minimum_investment_amount?: number

    @ApiProperty({ description: 'This is the maximum investment amount of the company looking for ', minimum:1, default: 1 })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsNumber() readonly max_investment_amount?: number

    @ApiProperty({ description: 'This is a determining field set to true if the company is interested in getting investments.', default: true })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsBoolean() readonly interested_in_investment?: boolean
    
    @ApiProperty({ description: 'This is a field where the company states its vision', default: "" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly vision?: string

    @ApiProperty({ description: 'This is a field where the company states its mission', default: "" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly mission?: string

    @ApiProperty({description: 'This is a field where the company states the date it was established'})
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly date_of_establishment?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company logo', default: "" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly logo?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company profile photo', default: "" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly profile_photo: string

    @ApiProperty({ description: 'This is a field will have the company elevator pitch ', default: "" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly elevator_pitch?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company facebook page', default: "" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly facebook?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company linkedin page', default: "" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly linkedin?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company twitter page', default: "" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly twitter?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company youtube page', default: "" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly youtube?: string

    @ApiProperty({ description: 'This is a field that will have the URI to the company other page', default: "" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly others?: string

    @ApiProperty({ description: 'This field will have the company\'s minimum valuation ', minimum:1, default: 1 })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsNumber() readonly min_valuation?: number

    @ApiProperty({ description: 'This field will have the company\'s maximum valuation ', minimum:1, default: 1 })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsNumber() readonly max_valuation?: number

    @ApiProperty({ description: 'This field will have the description for the company valuation', default: "" })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly valuation_description?: string

    @ApiProperty({ description: 'This field will describe the company type' })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly company_type?: string
}