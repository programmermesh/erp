import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEnum, IsNumber, IsBoolean, IsOptional } from "class-validator"
import { MONTHS_OF_THE_YEAR } from '../../../common/enum_values'

export class UpdateCompanyMilestone {
    @ApiProperty({ description: 'This is the title of the milestone'})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: 'This is the description of the milestone'})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    readonly description: string

    @ApiProperty({ description: 'This is the month', enum: MONTHS_OF_THE_YEAR})
    @IsEnum(MONTHS_OF_THE_YEAR)
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly month: MONTHS_OF_THE_YEAR

    @ApiProperty({ description: 'This is the year'})
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional()
    readonly year: number

    @ApiProperty({ description: 'This is the status of the milestone. True if archived and False if not archived'})
    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly milestone_archived: boolean
}