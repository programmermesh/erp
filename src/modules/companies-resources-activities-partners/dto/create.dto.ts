import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsEnum } from "class-validator"
import { RESOURCES_ACTIVITIES_RESOURCES_TYPE } from '../../../common/enum_values'

export class CreateDto {
    @ApiProperty({ description: 'This is the title/value Entity '})
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @ApiProperty({ description: 'This is the category Entity '})
    @IsNotEmpty()
    @IsString()
    readonly category: string

    @ApiProperty({  description: 'This an enum to specify if its is a resource, activity or partner', enum: RESOURCES_ACTIVITIES_RESOURCES_TYPE })
    @IsEnum(RESOURCES_ACTIVITIES_RESOURCES_TYPE)
    @IsNotEmpty()
    readonly type: RESOURCES_ACTIVITIES_RESOURCES_TYPE

    @ApiProperty({ description: 'The summary description'})
    @IsString()
    @ApiPropertyOptional()
    readonly description: string

}