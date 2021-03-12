import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsArray,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { COMPANY_TYPE } from '../../../common/enum_values';

export class UpdateCompanyDto {
  @ApiProperty({ description: 'This is the name of the company' })
  @IsNotEmpty()
  @IsOptional({ always: true })
  @ApiPropertyOptional()
  @IsString()
  readonly company_name: string;

  @IsNotEmpty()
  @IsOptional({ always: true })
  @ApiPropertyOptional()
  @IsString()
  readonly country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional({ always: true })
  @ApiPropertyOptional()
  @IsString()
  readonly city: string;

  @ApiProperty({ description: 'This is the size of the company' })
  @IsNotEmpty()
  @IsOptional({ always: true })
  @ApiPropertyOptional()
  @IsNumber()
  readonly team_size: string;

  @ApiProperty({
    description:
      'This is the minimum investment amount of the company looking for ',
    minimum: 0,
    default: 0,
  })
  @ApiProperty({
    description: 'This is a field where the company states its vision',
    default: '',
  })
  @IsOptional({ always: true })
  @ApiPropertyOptional()
  @IsString()
  readonly vision?: string;

  @ApiProperty({
    description:
      'This is a determining field set to true if the company vision is completed',
    default: true,
  })
  @ApiPropertyOptional()
  @IsOptional({ always: true })
  @IsBoolean()
  readonly is_vision_completed?: boolean;

  @ApiProperty({
    description: 'This is a field where the company states its mission',
    default: '',
  })
  @IsOptional({ always: true })
  @ApiPropertyOptional()
  @IsString()
  readonly mission?: string;

  @ApiProperty({
    description:
      'This is a determining field set to true if the company mission is completed',
    default: true,
  })
  @ApiPropertyOptional()
  @IsOptional({ always: true })
  @IsBoolean()
  readonly is_mission_completed?: boolean;

  @ApiProperty({
    description: 'This is a field that will have the URI to the company logo',
    default: '',
  })
  @IsOptional({ always: true })
  @ApiPropertyOptional()
  @IsString()
  readonly logo?: string;

  @ApiProperty({
    description:
      'This is a field that will have the URI to the company profile photo',
    default: '',
  })
  @IsOptional({ always: true })
  @ApiPropertyOptional()
  @IsString()
  readonly profile_photo: string;

  @ApiProperty({
    description: 'This is a field will have the company elevator pitch ',
    default: '',
  })
  @IsOptional({ always: true })
  @ApiPropertyOptional()
  @IsString()
  readonly elevator_pitch?: string;

  @ApiProperty({
    description: 'This field will describe the company type',
    enum: COMPANY_TYPE,
  })
  @IsEnum(COMPANY_TYPE)
  @IsOptional()
  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly company_type: COMPANY_TYPE;

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
    description:
      'This is a field with the investment time reference of the company',
    default: [],
  })
  @ApiPropertyOptional()
  @IsOptional({ always: true })
  @IsArray()
  readonly investors_time_reference: string;
}
