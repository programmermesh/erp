import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsEnum } from "class-validator"
import { COST_OR_REVENUE } from '../../../common/enum_values'

export class CreateCompanyCostAndRevenuesDto {
    @ApiProperty({ description: 'This is the title/value of the company value '})
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @ApiProperty({ description: 'The summary description'})
    @IsString()
    @ApiPropertyOptional()
    readonly description: string

    @ApiProperty({ description: 'This is the estimated value ot the cost or revenue'})
    @IsNumber()
    @IsNotEmpty()
    readonly estimated_cost: number

    @ApiProperty({  description: 'This an enum to specify if its cost or revenue', enum: COST_OR_REVENUE })
    @IsEnum(COST_OR_REVENUE)
    @IsNotEmpty()
    readonly type: COST_OR_REVENUE
}