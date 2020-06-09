import { IsNotEmpty, IsEmail, IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
export class CreateCompanyTeamMemberDto {
    
    @ApiProperty({ description: "This is the email of the user been invited" })
    @IsNotEmpty()
    @IsEmail() readonly invite_email: string
    
    @ApiProperty({ description: "This is the ID of the role been assigned" })
    @IsNotEmpty()
    @IsUUID() readonly role: string

    @ApiProperty({ description: "This is the ID of the access type been assigned" })
    @IsNotEmpty()
    @IsUUID() readonly access_type: string
}