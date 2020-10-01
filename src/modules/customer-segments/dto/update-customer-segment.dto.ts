import { IsString, IsOptional, IsNotEmpty } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateCustomerSegmentDto {
    @ApiProperty({ description: 'This is the unique customer segment name '})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsString() readonly name: string

    @ApiProperty({ description: 'This is the unique customer segment CODE '})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional() readonly initials: string
    
    @ApiProperty({ description: 'This is the unique color code for the segment '})
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsString() readonly color_code: string
    
    @ApiProperty({ description: 'Simple summary of what the field is' })
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsString() readonly description: string

}