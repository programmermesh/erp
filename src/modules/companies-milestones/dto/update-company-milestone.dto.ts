import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEnum, IsNumber, IsBoolean, IsOptional, IsDate, IsDateString } from "class-validator"
import { MONTHS_OF_THE_YEAR } from '../../../common/enum_values'

export class UpdateCompanyMilestoneDto {
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

    @ApiProperty({ description: 'This is the year of milestone achievement'})
    @IsNotEmpty()
    @IsDateString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly achievement_date: Date

    @ApiProperty({ description: 'This is the status of the milestone. True if archived and False if not archived'})
    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly milestone_achieved: boolean
}