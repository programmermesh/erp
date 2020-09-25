import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray } from "class-validator"
import { MONTHS_OF_THE_YEAR } from '../../../common/enum_values'

export class UpdateMarketPotentialDto {

    @ApiProperty({ description: 'This is the title'})
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly title: string

    @ApiProperty({ description: 'This is the market size'})
    @IsNumber()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly total_addressable_customers: number

    @ApiProperty({ description: 'This is the price for the service or product'})
    @IsNumber()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly price: number

    @ApiProperty({ description: 'This is the current market coverage'})
    @IsNumber()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly current_customers: number

    @ApiProperty({ description: 'This is the links field the market potentials'})
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly links: string

    @ApiProperty({ description: 'This is the description of the market potentials'})
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly description: string

    @ApiProperty({ description: 'This is the list of customers'})
    @IsArray()
    @ApiPropertyOptional()
    @IsOptional()
    readonly customers: {id:string}[]

    @ApiProperty({ description: 'This is the list of estimate market coverage'})
    @IsArray()
    @ApiPropertyOptional()
    @IsOptional()
    readonly estimated_market_coverage: {id:string, year: number, estimated_market_coverage: number, month: MONTHS_OF_THE_YEAR}[]
}