import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsEnum } from "class-validator";
import { COMPANY_NETWORK_INVITES_STATUS } from '../../../common/enum_values'

export class UpdateCompanyConnectionkDto {
    @ApiProperty({ description: 'This is the role that the company will have in the network' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly reason: string

    @ApiProperty({ description: 'This is the message that will be sent to a company ' })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly message: string

    @ApiProperty({ description: 'This is the status of the invite the company sent', enum: COMPANY_NETWORK_INVITES_STATUS })
    @IsEnum(COMPANY_NETWORK_INVITES_STATUS)
    @IsNotEmpty()    
    @IsOptional()
    readonly invitation_status: COMPANY_NETWORK_INVITES_STATUS
}