import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, Min } from "class-validator"

export class CreateIncomeBracketDto {

    @ApiProperty({ description: 'This is the title/value of the education_stage '})
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @ApiProperty({ description: 'The is the minimum income'})
    @IsNumber()
    @Min(0)
    readonly minimum_income: number

    @ApiProperty({ description: 'The is the maximum income'})
    @IsNumber()
    @Min(1)
    readonly maximum: number
}