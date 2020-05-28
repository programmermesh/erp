import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from "class-validator"

export class CreateCompanyRiskAnalysisDto {
    @ApiProperty({ description: 'This is the title of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: 'This is the type of the risk analysis'})
    @IsString()
    @IsNotEmpty()
    readonly type: string

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
}