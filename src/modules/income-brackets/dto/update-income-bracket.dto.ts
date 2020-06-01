import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, Min, IsOptional } from "class-validator"

export class UpdateIncomeBracketDto {

    @ApiProperty({ description: 'This is the title/value of the education_stage '})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly title: string

    @ApiProperty({ description: 'The is the minimum income'})
    @IsNumber()
    @Min(0)
    @IsOptional()
    @ApiPropertyOptional()
    readonly minimum_income: number

    @ApiProperty({ description: 'The is the maximum income'})
    @IsNumber()
    @Min(1)
    @IsOptional()
    @ApiPropertyOptional()
    readonly maximum: number
}