import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsUUID } from "class-validator"
import { RELATIONSHIP_STATUS, GENDER } from '../../../common/enum_values'

export class CreateCompanyCustomerDto {

    @ApiProperty({ description: 'This is the title of the customer '})
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @ApiProperty({ description: 'This is the minimum age'})
    @IsNotEmpty()
    @IsNumber()
    readonly minimum_age: number

    @ApiProperty({ description: 'This is the maximum age'})
    @IsNotEmpty()
    @IsNumber()
    readonly maximum_age: number

    @ApiProperty({ description: 'This is the gender of the customer', enum: GENDER})
    @IsEnum(GENDER)
    @IsNotEmpty()
    readonly sex: GENDER

    @ApiProperty({ description: 'This is the relationship status of the customer', enum: RELATIONSHIP_STATUS})
    @IsEnum(RELATIONSHIP_STATUS)
    @IsNotEmpty()
    readonly relationship_status: RELATIONSHIP_STATUS

    @ApiProperty({ description: 'This is the occupation of the customer'})
    @IsNotEmpty()
    @IsNumber()
    readonly occupation: string

    @ApiProperty({ description: 'This is the color code of the customer'})
    @IsNotEmpty()
    @IsNumber()
    readonly color_code: string

    @ApiProperty({ description: 'This is the general description of the customer'})
    @IsNotEmpty()
    @IsNumber()
    readonly general_description: string

    @ApiProperty({ description: 'The id of the education stage' })
    @IsUUID()
    readonly education_stageId: string

    @ApiProperty({ description: 'The id of the income bracket' })
    @IsUUID()
    readonly income_bracketId: string

    @ApiProperty({ description: 'The id of the company customer segment' })
    @IsUUID()
    readonly company_customer_segment: string

}