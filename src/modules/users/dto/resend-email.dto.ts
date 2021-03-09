import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResendEmailDto {
  @ApiProperty({
    description: 'This is the email of the company. Will be unique',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
