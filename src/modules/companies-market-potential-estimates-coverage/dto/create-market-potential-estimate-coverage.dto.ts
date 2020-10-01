import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumber, IsNotEmpty, IsUUID, IsEnum, IsOptional } from "class-validator"
import { MONTHS_OF_THE_YEAR } from '../../../common/enum_values'

export class CreateMarketPotentialsEstimateCoverageDto {

    @ApiProperty({ description: 'This is the estimated market coverage'})
    @IsNumber()
    @IsNotEmpty()
    readonly estimated_market_coverage: number

    @ApiProperty({ description: 'This is the month Between 01-12'})
    @IsEnum(MONTHS_OF_THE_YEAR)
    @IsNotEmpty()
    readonly month: MONTHS_OF_THE_YEAR

    /* PENDING: USE DATE for this */
    @ApiProperty({ description: 'This is the month Between 1900-current year'})
    @IsNumber()
    @IsNotEmpty()
    year: number

    @ApiProperty({ description: 'This is the percentage complete'})
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly percentage_complete: number
}