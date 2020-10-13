import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsNumber, IsDateString } from "class-validator"

export class UpdateCustomersDto {

    @ApiProperty({ description: 'This is the number of customers last month'})
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly last_month: number

    @ApiProperty({ description: 'This is the number of customers this month'})
    @IsNumber()
    @IsNotEmpty()    
    @IsOptional()
    @ApiPropertyOptional()
    readonly this_month: number

    @ApiProperty({ description: 'This is the number of acquired customers this month'})
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly acquired_customers: number

    @ApiProperty({ description: 'This is the date'})
    @IsDateString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly date_only: Date

}