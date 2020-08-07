import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsInt } from "class-validator";

export class UpdateSustainableGoalDto {
    @ApiProperty({ description: 'This is the unique name for the sustainable goal '})
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    readonly name: string

    @ApiProperty({ description: 'This is the url for the image used' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiPropertyOptional()
    readonly image_uri: string

    @ApiProperty({ description: 'This is position of the goal' })
    @IsOptional()
    @IsNotEmpty()
    @IsInt()
    @ApiPropertyOptional()
    readonly position: number

}