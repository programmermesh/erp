
import { IsNotEmpty, IsEmail, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ResetPasswordRequestDto {
    @ApiProperty({ description: 'This is the email the user registered with'})
    @IsNotEmpty()
    @IsEmail() readonly email: string
}

export class UpdatePasswordRequestDto {
    @ApiProperty({ description: 'This is the reset password request ID' })
    @IsNotEmpty() 
    @IsString() readonly requestId: string

    @ApiProperty({ description: 'This is the user password' })
    @IsNotEmpty() 
    @IsString() readonly password: string
}
