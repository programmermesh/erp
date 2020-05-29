import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty } from "class-validator"

export class CreateConversationsMembersDto {
    
    @ApiProperty({ description: 'This is the ID  of the network conversation the company is a member of ' })
    @IsUUID()
    @IsNotEmpty()
    readonly network_conversations: string

    @ApiProperty({ description: 'This is the ID  of the company ' })
    @IsUUID()
    @IsNotEmpty()
    companyId: string
}