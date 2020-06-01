import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class UpdateEducationStagesDto {

    @ApiProperty({ description: 'This is the title/value of the education_stage '})
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    readonly title: string

    @ApiProperty({ description: 'The summary description'})
    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly description: string    
}