import { IsString, IsOptional, IsNotEmpty } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateCustomerSegmentDto {
    @ApiProperty({ description: 'This is the unique customer segment name '})
    @IsNotEmpty()
    @IsString() readonly name: string
    
    @ApiProperty({ description: 'This is the unique color code for the segment '})
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @IsString() readonly color_code: string
    
    @ApiProperty({ description: 'Simple summary of what the field is' })
    @IsOptional({ always: true })
    @ApiPropertyOptional()
    @IsString() readonly description: string

}