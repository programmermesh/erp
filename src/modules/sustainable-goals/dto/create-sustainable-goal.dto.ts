import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateSustainableGoalDto {
    @ApiProperty({ description: 'This is the unique name for the sustainable goal '})
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @ApiProperty({ description: 'This is the url for the image used' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    readonly image_uri: string

    @ApiProperty({ description: 'Simple summary of what the field is' })
    @ApiPropertyOptional()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly description: string
}