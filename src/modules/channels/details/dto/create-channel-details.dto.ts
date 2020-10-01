import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateChannelDetailDto {
    @ApiProperty({ description: 'This is the details column of the channel' })
    @IsNotEmpty()
    @IsString()
    readonly details: string
}