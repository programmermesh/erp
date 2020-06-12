import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNumber, IsNotEmpty, IsUUID, IsEnum, IsOptional } from "class-validator"
import { MONTHS_OF_THE_YEAR } from '../../../common/enum_values'

export class UpdateMarketPotentialsEstimateCoverageDto {

    @ApiProperty({ description: 'This is the estimated market coverage'})
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    @IsNotEmpty()
    readonly estimated_market_coverage: number

    @ApiProperty({ description: 'This is the month Between 01-12'})
    @IsEnum(MONTHS_OF_THE_YEAR)
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly month: MONTHS_OF_THE_YEAR

    /* PENDING: USE DATE for this */
    @ApiProperty({ description: 'This is the month Between 1900-current year'})
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    year: number

    @ApiProperty({ description: 'This is the percentage complete'})
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly percentage_complete: number
}