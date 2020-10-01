import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateCompanyConversationDto {
    @ApiProperty({ description: 'This is the title of the conversation been created' })
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    @ApiPropertyOptional()
    readonly title: string
}