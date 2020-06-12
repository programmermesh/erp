import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty } from "class-validator"

export class CreateConnectionGroupsLeadListDto {
    @ApiProperty({ description: 'This is the id of the lead list' })
    @IsNotEmpty()
    @IsUUID()
    readonly lead_list_id: string
}