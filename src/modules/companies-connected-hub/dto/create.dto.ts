import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsEnum } from "class-validator"
import { CONNECTED_HUB_OR_INCUBATOR } from '../../../common/enum_values'

const name = 'Connected hub'

export class CreateConnectedHubDto {

    @ApiProperty({ description: `This is the title of the ${name}`})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: 'The type of connected to' })
    @IsEnum(CONNECTED_HUB_OR_INCUBATOR)
    @IsNotEmpty()
    readonly connected_to: CONNECTED_HUB_OR_INCUBATOR

    @ApiProperty({ description: `This is the notes of the ${name}`})
    @IsString()
    @IsNotEmpty()
    readonly description: string    

    @ApiProperty({ description: `These are the links of the ${name}`})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    readonly links: string
}