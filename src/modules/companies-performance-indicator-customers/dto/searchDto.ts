import { IsNotEmpty, IsOptional, IsEnum, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SearchDto {

    @ApiProperty({ description: 'This is the start  time of the search period (year-month)' })
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    from: string

    @ApiProperty({ description: 'This is the end time of the search period (year-month)' })
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    to: string
}