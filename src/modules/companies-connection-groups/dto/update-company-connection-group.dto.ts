import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class UpdateConnectionGroupsDto {
    @ApiProperty({ description: 'This is the name of the group'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly name: string

    @ApiProperty({ description: 'This is the url for the group photo'})
    @IsString()
    @IsNotEmpty()    
    @IsOptional()
    @ApiPropertyOptional()
    readonly connection_group_cover_photo: string
}