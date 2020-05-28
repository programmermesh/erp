import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEnum, IsNumber, IsBoolean } from "class-validator"
import { MONTHS_OF_THE_YEAR } from '../../../common/enum_values'

export class CreateCompanyMilestone {
    @ApiProperty({ description: 'This is the title of the milestone'})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: 'This is the description of the milestone'})
    @IsString()
    @IsNotEmpty()
    readonly description: string

    @ApiProperty({ description: 'This is the month', enum: MONTHS_OF_THE_YEAR})
    @IsEnum(MONTHS_OF_THE_YEAR)
    @IsNotEmpty()
    readonly month: MONTHS_OF_THE_YEAR

    @ApiProperty({ description: 'This is the year'})
    @IsNotEmpty()
    @IsNumber()
    readonly year: number

    @ApiProperty({ description: 'This is the status of the milestone. True if archived and False if not archived'})
    @IsBoolean()
    @IsNotEmpty()
    readonly milestone_archived: boolean
}