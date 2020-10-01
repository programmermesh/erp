import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID, IsOptional } from "class-validator"

export class CreateChannelDto {

    @ApiProperty({ description: 'This is the name of the channel' })
    @IsNotEmpty()
    @IsString()
    readonly name: string
    
}