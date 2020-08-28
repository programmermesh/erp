import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEnum, IsNumber, IsBoolean, IsOptional, IsDate, IsDateString } from "class-validator"
import { MONTHS_OF_THE_YEAR } from '../../../common/enum_values'

export class CreateCompanyMilestoneDto {
    @ApiProperty({ description: 'This is the title of the milestone'})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: 'This is the description of the milestone'})
    @IsString()
    @IsNotEmpty()
    readonly description: string

    @ApiProperty({ description: 'This is the category of the milestone'})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    @IsNotEmpty()
    readonly category: string

    @ApiProperty({ description: 'This is the year of milestone achievement'})
    @IsNotEmpty()
    @IsDateString()
    readonly achievement_date: Date


    @ApiProperty({ description: 'This is the status of the milestone. True if archived and False if not achieved'})
    @IsBoolean()
    @IsNotEmpty()
    readonly milestone_achieved: boolean
}