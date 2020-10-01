import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class CreateEducationStagesDto {

    @ApiProperty({ description: 'This is the title/value of the education_stage '})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: 'The summary description'})
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    readonly description: string    
}