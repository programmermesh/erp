import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty, IsString } from "class-validator"

export class CreateConversationMessageDto {
    
    @ApiProperty({ description: 'This is the ID of the conversation the message belongs to ' })
    @IsUUID()
    @IsNotEmpty()
    readonly network_conversationsId: string

    @ApiProperty({ description: 'This is the posted message' })
    @IsNotEmpty()
    @IsString()
    readonly message: string

    @ApiProperty({ description: 'The id of the writer of the message' })
    @IsNotEmpty()
    @IsUUID()
    sent_byId: string
}