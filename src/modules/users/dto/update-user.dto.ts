import { IsString, IsOptional, IsNotEmpty, IsBoolean} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateUserDto {   
    @ApiProperty({ description: 'This is the user first name and last name' })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly firstname_lastname: string

    @ApiProperty({ description: 'This is the user surname' })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly surname: string

    @ApiProperty({ description: 'This is the user country of residence' })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly country: string

    @ApiProperty({ description: 'This is the user city of residence' })
    @IsNotEmpty()
    @IsOptional({ always: true })    
    @ApiPropertyOptional()
    @IsString() readonly city: string 

    @ApiProperty({ description: 'This is the user facebook URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @IsString() readonly facebook: string

    @ApiProperty({  description: 'This is the user linkedin URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @IsString() readonly linkedin: string

    @ApiProperty({ description: 'This is the user twitter URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @IsString() readonly twitter: string

    @ApiProperty({  description: 'This is the user youtube URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @IsString() readonly youtube: string

    @ApiProperty({ description: 'This is the user other URI' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @IsString() readonly others: string

    @ApiProperty({ description: 'This is a field used to activate or disable a user .', default: true })
    @IsNotEmpty()
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @IsBoolean() readonly is_active: boolean 
}