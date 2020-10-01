import { IsString, IsOptional, IsNotEmpty } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateBusinessSectorDto {
    @ApiProperty({ description: 'This is the unique business sector name '})
    @IsNotEmpty()
    @IsString() readonly name: string    
    
    @ApiProperty({ description: 'Simple summary of what the field is' })
    @IsOptional()
    @ApiPropertyOptional()
    @IsString() readonly description: string
}