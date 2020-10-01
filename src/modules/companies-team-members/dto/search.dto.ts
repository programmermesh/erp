import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SearchDto {
    @ApiProperty({ description: 'This is the page number' })
    @IsNotEmpty()
    page: number

    @ApiProperty({ description: 'This is the number of items per page' })
    @IsNotEmpty() 
    limit: number

    @ApiProperty({ description: 'This is the search word been looked for' })
    @ApiPropertyOptional()
    @IsOptional()
    searchWord: string
}