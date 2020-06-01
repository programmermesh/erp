import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsNotEmpty, IsUUID, IsEnum } from "class-validator"
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

    /* Many potentials_estimate_coverage can belong to one market potential entry */
    @ApiProperty({ description: 'This is the ID of the market potential entity'})
    @IsUUID()
    @IsNotEmpty()
    market_potentialsId: string

}