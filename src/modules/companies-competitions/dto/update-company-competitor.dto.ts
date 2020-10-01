import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray } from "class-validator"
import { COMPETITORS_IMPORTANCE_LEVEL } from '../../../common/enum_values'

export class UpdateCompanyCompetitorDto {

    @ApiProperty({ description: 'This is name of the competitor'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly name: string

    @ApiProperty({ description: 'This is the type of competitor'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly type: string

    @ApiProperty({ description: 'This is the point of differentiation'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly point_of_differentiation: string

    @ApiProperty({ description: 'This is the details about the competitor '})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly details: string

    @ApiProperty({ description: 'This is the importance level of the competitor', enum: COMPETITORS_IMPORTANCE_LEVEL})
    @IsEnum(COMPETITORS_IMPORTANCE_LEVEL)
    @IsOptional()
    @ApiPropertyOptional()
    @IsNotEmpty()
    readonly importance_level: COMPETITORS_IMPORTANCE_LEVEL

    @ApiProperty({ description: 'This is the link or website url'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly website: string

    @ApiProperty({ description: 'This is the revenue stream [One-time revenue , recurring revenue]'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly revenue_stream: string

    @ApiProperty({ description: 'These are the different prices'})
    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly price: string[]

    @ApiProperty({ description: 'These are the different value_propositions'})
    @IsArray()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly value_proposition: string[]

    @ApiProperty({ description: 'This is the customer experience'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly customer_experience: string
}