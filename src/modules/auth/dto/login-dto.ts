import { IsString, IsOptional, IsNotEmpty, IsEmail} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
    @ApiProperty({ description: 'This is the email the user registered with'})
    @IsNotEmpty()
    @IsEmail() readonly email: string

    @ApiProperty({ description: 'This is the user password' })
    @IsNotEmpty()
    @IsString() readonly password: string
}
