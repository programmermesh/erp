import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateConnectionGroupsLeadListDto {
    @ApiProperty({ description: "This a field for the notes for this connection" })
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly notes: string

    @ApiProperty({ description: 'This is the ID of the company been added to the lead list' })
    @IsNotEmpty()
    @IsUUID()
    readonly lead_list_companyId: string

    // @ApiProperty({ description: 'This is the ID of the connection group to add the company to' })
    // @IsNotEmpty()
    // @IsUUID()
    // readonly connection_groupId: string

    @ApiProperty({ description: 'This is the name of the category in the connection group to add the company to' })
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly connection_group_category_name: string

}