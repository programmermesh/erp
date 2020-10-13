import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString } from "class-validator"

export class CreateCustomersDto {

    @ApiProperty({ description: 'This is the number of customers last month'})
    @IsNumber()
    @IsNotEmpty()
    readonly last_month: number

    @ApiProperty({ description: 'This is the number of customers this month'})
    @IsNumber()
    @IsNotEmpty()
    readonly this_month: number

    @ApiProperty({ description: 'This is the number of acquired customers this month'})
    @IsNumber()
    @IsNotEmpty()
    readonly acquired_customers: number

    @ApiProperty({ description: 'This is the date'})
    @IsDateString()
    @IsNotEmpty()
    readonly date_only: Date

}