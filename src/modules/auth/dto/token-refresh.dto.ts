
import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RefreshTokenDto {
    @ApiProperty({ description: 'This is the refresh token used by the user to generate an access token'})
    @IsNotEmpty()
    @IsString() readonly refresh_token: string
}