import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString, IsNotEmpty } from "class-validator"

export class UpdateCompanyValueDto {

    @ApiProperty({ description: 'This is the title/value of the company value '})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly title: string

    @ApiProperty({ description: 'The summary description'})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly summary: string

    @ApiProperty({ description: 'This is the color code assigned to the company_value'})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly color_code: string
}