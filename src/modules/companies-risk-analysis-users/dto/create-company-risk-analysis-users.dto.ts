import { IsUUID, IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateRiskAnalysisUserDto {
    /* Many risk_analysis_users entities can belong to one company team member */
    @ApiProperty({ description: 'This is the ID of the risk_analysis entity a user will be attached to' })
    @IsUUID()
    @IsNotEmpty()
    readonly company_team_membersId: string
}