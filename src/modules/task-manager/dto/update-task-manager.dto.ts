import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskManagerDto {
  @ApiProperty({ description: 'completed task', default: true })
  @IsString()
  @IsOptional({ always: true })
  @ApiPropertyOptional()
  @IsBoolean()
  readonly is_completed?: boolean;
}
