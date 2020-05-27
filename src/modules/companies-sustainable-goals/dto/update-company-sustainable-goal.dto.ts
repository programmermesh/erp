import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional } from "class-validator"

export class UpdateCompanySustainableGoalDto {
    @ApiProperty({ description: 'This field will have the objective for a given company', default: "" })
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    readonly objective: string
    
    @ApiProperty({ description: 'This field will have the description for a given company', default: "" })
    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    readonly description: string

}