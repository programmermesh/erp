import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsDateString } from "class-validator"

export class CreateDto {

    @ApiProperty({ description: 'This is the revenue last month'})
    @IsNumber()
    @IsNotEmpty()
    readonly last_month: number

    @ApiProperty({ description: 'This is the revenue this month'})
    @IsNumber()
    @IsNotEmpty()
    readonly this_month: number

    @ApiProperty({ description: 'This is the generated revenue'})
    @IsNumber()
    @IsNotEmpty()
    readonly generated_revenue: number

    @ApiProperty({ description: 'This is the reserve_from_previous_period revenue'})
    @IsNumber()
    @IsNotEmpty()
    readonly reserve_from_previous_period: number

    @ApiProperty({ description: 'This is the funding revenue'})
    @IsNumber()
    @IsNotEmpty()
    readonly funding: number

    @ApiProperty({ description: 'This is the date'})
    @IsDateString()
    @IsNotEmpty()
    readonly date_only: Date

}