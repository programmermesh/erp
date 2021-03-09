import { IsString, IsOptional, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OnboardingDto {
  @ApiProperty({ description: 'This is the user company name' })
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @ApiProperty({ description: 'This is the user department' })
  @IsNotEmpty()
  @IsString()
  department: string;

  @ApiProperty({ description: 'This is the user role' })
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({ description: 'This is the user team size' })
  @IsNotEmpty()
  @IsString()
  team_size: string;

  @ApiProperty({ description: 'This is the business stage' })
  @IsNotEmpty()
  @IsString()
  business_stage: string;

  @ApiProperty({ description: 'This is the user business objectives' })
  @IsNotEmpty()
  @IsString()
  business_objectives: string;

  @ApiProperty({ description: 'This is the user investors reference' })
  @IsNotEmpty()
  @IsString()
  investors_time_reference: string;
}
