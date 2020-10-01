import { IsNotEmpty,IsUUID, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BulkCompanyBusinessSectorDto {
    @ApiProperty({ description: 'This is an array of objects for the different sectors with ID properties in them', default: [] })
    @IsArray()
    @IsNotEmpty()
    readonly business_sectors: {id: String, name: String}[]
}