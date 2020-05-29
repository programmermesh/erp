import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateChannelDto {

    @ApiProperty({ description: 'This is the name of the channel' })
    @IsNotEmpty()
    @IsString()
    readonly name: string
    
    @ApiProperty({ description: 'This is the ID of the relation the channel belong to' })
    @IsNotEmpty()
    @IsUUID()
    readonly relationsId: string
}