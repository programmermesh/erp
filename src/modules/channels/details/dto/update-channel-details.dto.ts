import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID, IsOptional } from "class-validator"

export class UpdateChannelDetailDto {
    @ApiProperty({ description: 'This is the details column of the channel' })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly details: string
    
}