import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class UpdateCompanyCompetitorDto {

    @ApiProperty({ description: 'This is name of the competitor'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly name: string

    @ApiProperty({ description: 'This is the type of competitor'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly type: string

    @ApiProperty({ description: 'This is the point of differentiation'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly point_of_differentiation: string

    @ApiProperty({ description: 'This is the details about the competitor '})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly details: string

    @ApiProperty({ description: 'This is the importance level of the competitor'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly importance_level: string

    @ApiProperty({ description: 'This is the link or website url'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly website: string
}