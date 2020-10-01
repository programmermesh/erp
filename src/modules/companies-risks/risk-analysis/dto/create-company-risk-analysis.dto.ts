import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsArray } from "class-validator"
import { RISK_ANALYSIS_TYPE } from '../../../../common/enum_values'

export class CreateCompanyRiskAnalysisDto {
    @ApiProperty({ description: 'This is the title of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: 'This is the type of the risk analysis', enum: RISK_ANALYSIS_TYPE})
    @IsEnum(RISK_ANALYSIS_TYPE)
    @IsNotEmpty()
    readonly type: RISK_ANALYSIS_TYPE

    @ApiProperty({ description: 'This is the consiquences of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    readonly consequences: string

    @ApiProperty({ description: 'This is the likelihood of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    readonly likelihood: string

    @ApiProperty({ description: 'This is the description of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    readonly description: string

    @ApiProperty({ description: 'This is the team assigned to the analysis'})
    @IsOptional()
    @ApiPropertyOptional()
    @IsArray()
    readonly team_members: {id:string}[]

}