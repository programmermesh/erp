import { ApiProperty } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty } from "class-validator"

export class CreateCompanyConversationDto {
    @ApiProperty({ description: 'This is the ID  of the company that created the network' })
    @IsUUID()
    @IsNotEmpty()
    readonly company: string
}