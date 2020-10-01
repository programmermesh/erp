import { IsString, IsOptional, IsNotEmpty, IsEmail, IsNumber, IsBoolean, IsUUID, IsArray, IsEnum} from 'class-validator'
import { ApiProperty, ApiPropertyOptional, ApiBearerAuth } from '@nestjs/swagger'
import { COMPANY_TYPE } from '../../../common/enum_values'

export class CreateCompanyDto {
    @ApiProperty({ description: 'This is the user id ' })
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsUUID() readonly user_id: string

    @ApiProperty({ description: 'This is the name of the company' })
    @IsNotEmpty()
    @IsString() readonly name: string

    @ApiProperty({ description: " The address for the company"})
    @IsNotEmpty()
    @IsString() readonly address: string

    @ApiProperty({ description: "The country the company is registered or located" })
    @IsNotEmpty()
    @IsString() readonly country: string

    @ApiProperty({ description: "The city the company is located in" })
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

    @ApiProperty({ description: 'This is the size of the company'})
    @IsNotEmpty()
    @IsString() readonly company_size: string

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

    // WHEN CREATING A NEW COMPANY THE business_stages, business_sectors and customer_segments will be sent as arrays

    @ApiProperty({ description: 'This is a field with the customer segments assigned to the company', default: [] })
    @ApiPropertyOptional()
    @IsOptional({ always: true })
    @IsArray() readonly customer_segments: any

    @ApiProperty({ description: 'This is a field with the business sectors assigned to the company', default: [] })
    @ApiPropertyOptional()
    @IsOptional({ always: true })
    @IsArray() readonly business_sectors: any

    @ApiProperty({ description: 'This is a field with the business stages assigned to the company', default: [] })
    @ApiPropertyOptional()
    @IsOptional({ always: true })
    @IsArray() readonly business_stages: any

    @ApiProperty({ description: 'This field will describe the company type', enum: COMPANY_TYPE})
    @IsEnum(COMPANY_TYPE)
    @IsOptional()
    @ApiPropertyOptional()
    @IsNotEmpty()
    readonly company_type: COMPANY_TYPE

    /*
     customer_segments: [],
      business_sectors: [],
      business_stages: [],
    */
    
}