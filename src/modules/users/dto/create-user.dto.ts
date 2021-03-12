import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'This is the email of the company. Will be unique',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'This is the user first name and last name' })
  @IsNotEmpty()
  @IsString()
  firstname_lastname: string;

  @ApiProperty({ description: 'This is the user password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'active' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  is_active: boolean;

  @ApiProperty({ description: 'active token' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  active_token: string;
}
