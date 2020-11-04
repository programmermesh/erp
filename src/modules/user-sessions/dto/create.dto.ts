import { IsString, IsNotEmpty, IsNumber, IsUUID, IsOptional, IsBoolean} from 'class-validator'
import { ApiProperty, ApiPropertyOptional  } from '@nestjs/swagger'

export class CreateUserSessionDto {

    @ApiProperty({ description: 'Time the user spent so far'})
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    active_time: number

    @ApiProperty({ description: 'This is used to check if the session is actively been used or not'})
    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    in_use: boolean

    @ApiProperty({ description: 'The token the user is using'})
    @IsString()
    @IsNotEmpty()
    token: string

    // @ApiProperty({ description: 'This is the ID of the user' })
    // @IsNotEmpty()
    // @IsUUID()
    // @IsString() readonly userId: string
}