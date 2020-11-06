import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SearchDto {
    @ApiProperty({ description: 'This is the page number' })
    @IsNotEmpty()
    page: number

    @ApiProperty({ description: 'This is the number of items per page' })
    @IsNotEmpty() 
    limit: number

    // @ApiProperty({ description: 'This is the search word been looked for' })
    // @ApiPropertyOptional()
    // @IsOptional()
    // searchWord: string

    @ApiProperty({ description: 'The status of the session' })
    @ApiPropertyOptional()
    @IsOptional()
    in_use: number

    @ApiProperty({ description: 'The status of the session' })
    @ApiPropertyOptional()
    @IsOptional()
    active: number

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