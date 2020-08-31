import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray } from "class-validator"
import { RISK_ANALYSIS_TYPE } from '../../../../common/enum_values'

export class UpdateCompanyRiskAnalysisDto {
    @ApiProperty({ description: 'This is the title of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly title: string

    @ApiProperty({ description: 'This is the type of the risk analysis', enum: RISK_ANALYSIS_TYPE})
    @IsEnum(RISK_ANALYSIS_TYPE)
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly type: RISK_ANALYSIS_TYPE

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

    @ApiProperty({ description: 'This is the team assigned to the analysis'})
    @IsOptional()
    @ApiPropertyOptional()
    @IsArray()
    readonly team_members: {id:string}[]
}