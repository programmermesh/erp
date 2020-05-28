import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { RISK_ASSESSTMENT_TYPE } from '../../../../common/enum_values'
import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator"

export class UpdateRiskAssessmentDto {
    @ApiProperty({ description: 'This is the title of the risk assessment'})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly title: string

    @ApiProperty({ description: 'This is the description of the risk assessment'})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly description: string
    
    @ApiProperty({ description: 'This is the type of the risk assessment', enum: RISK_ASSESSTMENT_TYPE})
    @IsEnum(RISK_ASSESSTMENT_TYPE)
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly type: RISK_ASSESSTMENT_TYPE

}