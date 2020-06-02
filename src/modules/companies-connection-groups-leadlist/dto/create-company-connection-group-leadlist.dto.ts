import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty } from "class-validator"

export class CreateConnectionGroupsLeadListDto {
    @ApiProperty({ description: 'This is the id of the connection group' })
    @IsUUID()
    @IsNotEmpty()
    readonly connection_groupId: string

    @ApiProperty({ description: 'This is the id of the lead list' })
    @IsNotEmpty()
    @IsUUID()
    lead_listId: string
}