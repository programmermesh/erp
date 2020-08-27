import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsEnum } from "class-validator"
import { COMPETITORS_IMPORTANCE_LEVEL } from '../../../common/enum_values'

export class CreateCompanyCompetitorDto {

    @ApiProperty({ description: 'This is name of the competitor'})
    @IsString()
    @IsNotEmpty()
    readonly name: string

    @ApiProperty({ description: 'This is the type of competitor'})
    @IsString()
    @IsNotEmpty()
    readonly type: string

    @ApiProperty({ description: 'This is the point of differentiation'})
    @IsString()
    @IsNotEmpty()
    readonly point_of_differentiation: string

    @ApiProperty({ description: 'This is the details about the competitor '})
    @IsString()
    @IsNotEmpty()
    readonly details: string

    @ApiProperty({ description: 'This is the importance level of the competitor', enum: COMPETITORS_IMPORTANCE_LEVEL})
    @IsEnum(COMPETITORS_IMPORTANCE_LEVEL)
    @IsOptional()
    @ApiPropertyOptional()
    @IsNotEmpty()
    readonly importance_level: COMPETITORS_IMPORTANCE_LEVEL

    @ApiProperty({ description: 'This is the link or website url'})
    @IsString()
    @IsNotEmpty()
    readonly website: string
}