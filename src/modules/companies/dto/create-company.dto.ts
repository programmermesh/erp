import { IsString, IsOptional, IsNotEmpty, IsEmail, IsNumber, IsBoolean} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateCompanyDto {
    @ApiProperty({ description: 'This is the name of the company' })
    @IsNotEmpty()
    @IsString() readonly name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString() readonly address: string

    @IsNotEmpty()
    @IsString() readonly country: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString() readonly city: string

    @ApiProperty({ description: 'This is the email of the company. Will be unique' })
    @IsNotEmpty()
    @IsEmail() readonly email: string

    @ApiProperty({ description: "Companies email address" })
    @IsNotEmpty()
    @IsString() readonly phone: string

    @ApiProperty({ description: 'This is the wesite of the company website URI' })
    @IsNotEmpty()
    @IsString() readonly website: string

    @ApiProperty({ description: 'This is the size of the company', minimum:1, default: 1 })
    @IsNotEmpty()
    @IsNumber() readonly customer_size: number

    @ApiProperty({ description: 'This is the minimum investment amount of the company looking for ', minimum:1, default: 1 })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @IsNumber() readonly minimum_investment_amount?: number

    @ApiProperty({ description: 'This is the maximum investment amount of the company looking for ', minimum:1, default: 1 })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @IsNumber() readonly max_investment_amount?: number

    @ApiProperty({ description: 'This is a determining field set to true if the company is interested in getting investments.', default: true })
    @ApiPropertyOptional()
    @IsOptional({ always: true })
    @IsBoolean() readonly interested_in_investment?: boolean
    
}