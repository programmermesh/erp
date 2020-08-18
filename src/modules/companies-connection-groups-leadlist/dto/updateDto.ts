import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateConnectionGroupsLeadListDto {
    @ApiProperty({ description: "This a field for the notes for this connection" })
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly notes: string

    @ApiProperty({ description: 'This is the name of the category in the connection group to add the company to' })
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly connection_group_category_name: string

}