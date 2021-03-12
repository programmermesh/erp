import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskManagerDto {
  @ApiProperty({ description: 'This is the task id' })
  @IsNotEmpty()
  @IsString()
  company_id: string;

  @ApiProperty({
    description: 'This is the name of the task',
  })
  @IsNotEmpty()
  @IsString()
  task_name: string;

  @ApiProperty({ description: 'This is the user id assigned to' })
  @IsNotEmpty()
  @IsString()
  assign_to: string;

  @ApiProperty({ description: 'This is the owner id' })
  @IsNotEmpty()
  @IsString()
  owner: string;
}
