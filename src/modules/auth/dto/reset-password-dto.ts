import { IsNotEmpty, IsEmail} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ResetPasswordRequestDto {
    @ApiProperty({ description: 'This is the email the user registered with'})
    @IsNotEmpty()
    @IsEmail() readonly email: string
}


