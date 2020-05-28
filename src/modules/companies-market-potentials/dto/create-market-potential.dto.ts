import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsNumber } from "class-validator"

export class CreateMarketPotentialDto {

    @ApiProperty({ description: 'This is the title'})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: 'This is the market size'})
    @IsNumber()
    @IsNotEmpty()
    readonly market_size: number

    @ApiProperty({ description: 'This is the current coverage size'})
    @IsString()
    @IsNotEmpty()
    readonly current_coverage_size: string

    @ApiProperty({ description: 'This is the description of the market potentials'})
    @IsString()
    @IsNotEmpty()
    readonly description: string
}