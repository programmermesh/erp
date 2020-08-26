import { IsNotEmpty,IsUUID, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class BulkCompanyCustomerSegmentDto {
    @ApiProperty({ description: 'This is an array of objects for the different segments with ID properties in them', default: [] })
    @IsArray()
    @IsNotEmpty()
    readonly customer_segments: {id: String, name: String}[]
}