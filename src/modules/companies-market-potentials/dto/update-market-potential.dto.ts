import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

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
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly current_coverage_size: string

    @ApiProperty({ description: 'This is the description of the market potentials'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly description: string
}