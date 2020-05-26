import { IsString, IsOptional, IsNotEmpty, IsEmail} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {

    @ApiProperty({ description: 'This is the email of the company. Will be unique'})
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @ApiProperty({ description: 'This is the user first name and last name' })
    @IsNotEmpty()
    @IsString() readonly firstname_lastname: string

    @ApiProperty({ description: 'This is the user surname' })
    @IsNotEmpty()
    @IsString() readonly surname: string

    @ApiProperty({ description: 'This is the user password' })
    @IsNotEmpty()
    @IsString() readonly password: string

    @ApiProperty({ description: 'This is the user country of residence' })
    @IsNotEmpty()
    @IsString() readonly country: string

    @ApiProperty({ description: 'This is the user city of residence' })
    @IsNotEmpty()
    @IsString() readonly city: string 

    @ApiProperty({ description: 'This is the user facebook URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    readonly facebook: string

    @ApiProperty({  description: 'This is the user linkedin URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    readonly linkedin: string

    @ApiProperty({ description: 'This is the user twitter URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    readonly twitter: string

    @ApiProperty({  description: 'This is the user youtube URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    readonly youtube: string

    @ApiProperty({ description: 'This is the user other URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    readonly others: string
}