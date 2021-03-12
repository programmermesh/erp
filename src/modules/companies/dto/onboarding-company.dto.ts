import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { COMPANY_TYPE } from 'src/common/enum_values';

export class OnBoardingCompanyDto {
  @ApiProperty({ description: 'This is the user id ' })
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  @IsUUID()
  readonly user_id: string;

  @ApiProperty({ description: 'This is the user company name' })
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @ApiProperty({
    description: 'The country the company is registered or located',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly country?: string;

  @ApiProperty({ description: 'The city the company is located in' })
  @IsNotEmpty()
  @IsString()
  readonly city?: string;

  @ApiProperty({ description: 'This is the user department' })
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  department?: string;

  @ApiProperty({ description: 'This is the user role' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  role?: string;

  @ApiProperty({ description: 'This is the user team size' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  team_size?: string;

  // WHEN CREATING A NEW COMPANY THE business_stages, business_sectors and customer_segments will be sent as arrays

  @ApiProperty({
    description:
      'This is a field with the customer segments assigned to the company',
    default: [],
  })
  @ApiPropertyOptional()
  @IsOptional({ always: true })
  @IsArray()
  readonly customer_segments: any;

  @ApiProperty({
    description:
      'This is a field with the business sectors assigned to the company',
    default: [],
  })
  @ApiPropertyOptional()
  @IsOptional({ always: true })
  @IsArray()
  readonly business_sectors: any;

  @ApiProperty({
    description:
      'This is a field with the business stages assigned to the company',
    default: [],
  })
  @ApiPropertyOptional()
  @IsOptional({ always: true })
  @IsArray()
  readonly business_stages: any;

  @ApiProperty({
    description: 'This field will describe the company type',
    enum: COMPANY_TYPE,
  })
  @IsEnum(COMPANY_TYPE)
  @IsOptional()
  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly company_type: COMPANY_TYPE;

  @ApiProperty({ description: 'This is the user business objectives' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  business_objectives?: string;

  @ApiProperty({ description: 'This is the user investors reference' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  investors_time_reference?: string;
}
