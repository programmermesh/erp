import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from "class-validator"
import { MONTHS_OF_THE_YEAR } from '../../../common/enum_values'

export class CreateMarketPotentialDto {

    @ApiProperty({ description: 'This is the title'})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: 'This is the market size'})
    @IsNumber()
    @IsNotEmpty()
    readonly market_size: number

    @ApiProperty({ description: 'This is the current market coverage'})
    @IsNumber()
    @IsNotEmpty()
    readonly current_market_coverage: number

    @ApiProperty({ description: 'This is the description of the market potentials'})
    @IsString()
    @IsNotEmpty()
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
    readonly estimate_market_coverage: {id:string, year: number, estimate_market_coverage: number, month: MONTHS_OF_THE_YEAR}[]
}