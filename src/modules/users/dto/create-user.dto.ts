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

  @ApiProperty({ description: 'This is the user company name' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  company_name: string;

  @ApiProperty({ description: 'This is the user department' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  department: string;

  @ApiProperty({ description: 'This is the user role' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  role: string;

  @ApiProperty({ description: 'This is the user team size' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  team_size: string;

  @ApiProperty({ description: 'This is the business stage' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  business_stage: string;

  @ApiProperty({ description: 'This is the user business objectives' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  business_objectives: string;

  @ApiProperty({ description: 'This is the user investors reference' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  investors_time_reference: string;

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
