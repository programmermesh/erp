import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class UpdatePasswordRequestDto {
    @ApiProperty({ description: 'This is the new user password' })
    @IsNotEmpty() 
    @IsString() readonly password: string
}