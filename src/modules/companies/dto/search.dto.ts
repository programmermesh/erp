import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SearchDto {
    @ApiProperty({ description: 'This is the page number' })
    @IsNotEmpty()
    page: number

    @ApiProperty({ description: 'This is the number of items per page' })
    @IsNotEmpty() 
    limit: number

    @ApiProperty({ description: 'The date to begin the filter from' })
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    from: string

    @ApiProperty({ description: 'The last date to filter data to' })
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    to: string
}