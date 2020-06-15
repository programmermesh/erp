import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsUUID, IsOptional } from "class-validator"
import { RELATIONSHIP_STATUS, GENDER } from '../../../common/enum_values'

export class UpdateCompanyCustomerDto {

    // @ApiProperty({ description: 'This is the title of the customer '})
    // @IsNotEmpty()
    // @IsString()
    // @IsOptional()
    // @ApiPropertyOptional()
    // readonly title: string

    @ApiProperty({ description: 'This is the minimum age'})
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    readonly minimum_age: number

    @ApiProperty({ description: 'This is the maximum age'})
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    readonly maximum_age: number

    @ApiProperty({ description: 'This is the gender of the customer', enum: GENDER})
    @IsEnum(GENDER)
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly sex: GENDER

    @ApiProperty({ description: 'This is the relationship status of the customer', enum: RELATIONSHIP_STATUS})
    @IsEnum(RELATIONSHIP_STATUS)
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly relationship_status: RELATIONSHIP_STATUS

    @ApiProperty({ description: 'This is the occupation of the customer'})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly occupation: string

    @ApiProperty({ description: 'This is the color code of the customer'})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly color_code: string

    @ApiProperty({ description: 'This is the general description of the customer'})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly general_description: string

    @ApiProperty({ description: 'The id of the education stage' })
    @IsUUID()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional()
    readonly education_stageId: string

    @ApiProperty({ description: 'The id of the income bracket' })
    @IsUUID()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional()
    readonly income_bracketId: string

}