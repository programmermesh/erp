import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateCompanyConversationDto {
    @ApiProperty({ description: 'This is the title of the conversation been created' })
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly title: string
}