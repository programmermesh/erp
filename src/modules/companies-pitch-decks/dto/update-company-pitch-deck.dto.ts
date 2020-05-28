import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class UpdateCompanyPitchDeckDto {

    @ApiProperty({ description: 'This is the title of the pick deck'})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly title: string

    @ApiProperty({ description: 'This is the type of the pick deck'})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly type: string

    @ApiProperty({ description: 'This is the notes of the pick deck'})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly notes: string    

    @ApiProperty({ description: 'This is the link of the pick deck'})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly link: string

    @ApiProperty({ description: 'This is the url for cover_image of the pick deck'})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly cover_image: string
}