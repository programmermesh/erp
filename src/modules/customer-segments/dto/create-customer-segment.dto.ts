import { IsString, IsOptional, IsNotEmpty } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateCustomerSegmentDto {
    @ApiProperty({ description: 'This is the unique customer segment CODE '})
    @IsNotEmpty()
    initials: string

    @ApiProperty({ description: 'This is the unique customer segment name '})
    @IsNotEmpty()
    name: string
    
    @ApiProperty({ description: 'This is the unique color code for the segment '})
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsString() readonly color_code: string
    
    @ApiProperty({ description: 'Simple summary of what the field is' })
    @IsOptional()
    @ApiPropertyOptional()
    @IsString() readonly description: string

}