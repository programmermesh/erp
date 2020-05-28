import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class UpdateCompanyRiskAnalysisDto {
    @ApiProperty({ description: 'This is the title of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly title: string

    @ApiProperty({ description: 'This is the type of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly type: string

    @ApiProperty({ description: 'This is the consiquences of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly consequences: string

    @ApiProperty({ description: 'This is the likelihood of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly likelihood: string

    @ApiProperty({ description: 'This is the description of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly description: string
}