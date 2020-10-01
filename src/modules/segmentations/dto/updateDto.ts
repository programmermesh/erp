import { IsString, IsOptional, IsNotEmpty, IsEnum } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CUSTOMERS_SEGMENTS_CATEGORIES } from '../../../common/enum_values'

export class UpdateSegmenationDto {
    @ApiProperty({ description: 'This is the title '})
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({ description: 'This name of the category [behavioral, demographic, geography, psychographic]', enum: CUSTOMERS_SEGMENTS_CATEGORIES})
    @IsEnum(CUSTOMERS_SEGMENTS_CATEGORIES)
    @IsNotEmpty()
    readonly category: CUSTOMERS_SEGMENTS_CATEGORIES 

}