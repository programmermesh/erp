import { IsNotEmpty, IsEmail, IsUUID, IsOptional, IsBoolean } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
export class UpdateCompanyTeamMemberDto {
        
    @ApiProperty({ description: "This is the ID of the role been assigned" })
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsUUID() readonly role_id: string

    @ApiProperty({ description: "This is the ID of the access type been assigned" })
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsUUID() readonly access_type_id: string

    @ApiProperty({ description: "This is the boolean to determine if the team invitation was accepted or not" })
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsBoolean() invite_accepted: boolean

    @ApiProperty({ description: "This is the boolean to determine if the team invitation was archived or not" })
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsBoolean() archived: boolean
}