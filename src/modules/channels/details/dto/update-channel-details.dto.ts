import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID, IsOptional } from "class-validator"

export class UpdateChannelDetailDto {
    @ApiProperty({ description: 'This is the details column of the channel' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly details: string

    @ApiProperty({ description: 'This is the ID of the channel that is related to this details' })
    @IsNotEmpty()
    @IsUUID()
    @IsOptional()
    @ApiPropertyOptional()
    readonly channelsId: string
}