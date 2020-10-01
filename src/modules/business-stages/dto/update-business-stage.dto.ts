import { IsString, IsOptional, IsNotEmpty } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateBusinessStageDto {
    @ApiProperty({ description: 'This is the unique business stage name '})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsString() readonly name: string    
    
    @ApiProperty({ description: 'Simple summary of what the field is' })
    @IsOptional()
    @ApiPropertyOptional()
    @IsString() readonly description: string
}