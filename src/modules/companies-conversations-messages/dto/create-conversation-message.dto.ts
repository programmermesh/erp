import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty, IsString } from "class-validator"

export class CreateConversationMessageDto {
    
    @ApiProperty({ description: 'This is the posted message' })
    @IsNotEmpty()
    @IsString()
    readonly message: string
}