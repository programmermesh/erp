import { IsNotEmpty, IsEmail, IsOptional, IsBoolean} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class ResetPasswordRequestDto {
    @ApiProperty({ description: 'This is the email the user registered with'})
    @IsNotEmpty()
    @IsEmail() readonly email: string

    @ApiProperty({ description: 'Boolean set to true is the user is requesting for reseting password when logged in' })
    @IsOptional()
    @ApiPropertyOptional()
    @IsBoolean()
    userIsSignedIn: Boolean
}


