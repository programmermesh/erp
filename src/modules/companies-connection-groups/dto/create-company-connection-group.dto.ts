import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator"

export class CreateConnectionGroupsDto {
    @ApiProperty({ description: 'This is the name of the group'})
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty({ description: 'This is the notes about the group'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly notes: string

    @ApiProperty({ description: 'This is array of categories in the group'})
    @IsArray()
    @IsOptional()
    @ApiPropertyOptional()
    readonly save_in: string

}