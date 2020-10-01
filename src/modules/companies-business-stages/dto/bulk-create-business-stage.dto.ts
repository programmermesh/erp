import { IsNotEmpty,IsUUID, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BulkCompanyBusinessStagesDto {
    @ApiProperty({ description: 'This is an array of objects for the different stages with ID properties in them', default: [] })
    @IsArray()
    @IsNotEmpty()
    readonly business_stages: {id: String, name: String}[]
}