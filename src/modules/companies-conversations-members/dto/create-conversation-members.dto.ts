import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty } from "class-validator"

export class CreateConversationsMembersDto {
    
    @ApiProperty({ description: 'This is the ID  of the company ' })
    @IsUUID()
    @IsNotEmpty()
    companyId: string
}
