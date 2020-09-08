import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray } from "class-validator"

export class UpdateMarketPotentialDto {

    @ApiProperty({ description: 'This is the title'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly title: string

    @ApiProperty({ description: 'This is the market size'})
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly market_size: number

    @ApiProperty({ description: 'This is the current coverage size'})
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly current_market_coverage: number

    @ApiProperty({ description: 'This is the description of the market potentials'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
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
    readonly estimate_market_coverage: {id:string}[]
}