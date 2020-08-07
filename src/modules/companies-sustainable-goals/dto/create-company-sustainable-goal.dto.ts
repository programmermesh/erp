import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional, IsUUID, IsBoolean } from "class-validator"

export class CreateCompanySustainableGoalDto {
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

    @ApiProperty({ description: 'This field a boolean to set the goal as active or not', default: "" })
    @ApiPropertyOptional()
    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    readonly active: boolean

    @ApiProperty({ description: 'This will be the ID of the sustainable goal the field is assigned to' })
    @IsNotEmpty()
    @IsUUID()
    readonly sustainable_goal: string

}