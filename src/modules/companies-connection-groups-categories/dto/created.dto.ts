import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsArray, IsUUID } from "class-validator"

export class CreateConnectionGroupsCategoryDto {
    @ApiProperty({ description: 'This is the name of the category'})
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty({ description: 'This is the ID of the connection group the group'})
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    readonly connection_groupId: string

}