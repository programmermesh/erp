import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID, IsOptional } from "class-validator"

export class UpdateChannelDto {

    @ApiProperty({ description: 'This is the name of the channel' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly name: string
    
    @ApiProperty({ description: 'This is the ID of the relation the channel belong to' })
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsUUID()
    readonly relationsId: string
}