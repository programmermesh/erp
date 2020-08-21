import { IsNumber, IsNotEmpty, IsOptional, IsEnum } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CONNECTION_TYPE } from '../../../common/enum_values'

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

    @ApiProperty({ description: 'This is the search word been looked for' })
    @ApiPropertyOptional()
    @IsOptional()
    connection_status: string

    @ApiProperty({ description: 'This is "incoming" for incoming requests and "outgoing" for outcoming requests', default: CONNECTION_TYPE.outgoing })
    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(CONNECTION_TYPE)
    connection_type: string
}