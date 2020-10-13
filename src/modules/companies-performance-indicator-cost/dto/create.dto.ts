import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsDateString } from "class-validator"

export class CreateDto {

    @ApiProperty({ description: 'This is the cost last month'})
    @IsNumber()
    @IsNotEmpty()
    readonly last_month: number

    @ApiProperty({ description: 'This is the cost this month'})
    @IsNumber()
    @IsNotEmpty()
    readonly this_month: number

    @ApiProperty({ description: 'This is the Market Expense'})
    @IsNumber()
    @IsNotEmpty()
    readonly market_expenses: number

    @ApiProperty({ description: 'This is the date'})
    @IsDateString()
    @IsNotEmpty()
    readonly date_only: Date

    /*
   @Column('integer',{ default: 0})
    last_month: number

    @Column('integer',{ default: 0})
    this_month: number

    @Column('integer',{ default: 0})
    market_expenses: number

    @Column({ type: 'date' })
    date_only: Date
    */

}