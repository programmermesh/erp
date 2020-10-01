import { IsNotEmpty,IsUUID } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateCompanyCustomerSegmentDto {
    @ApiProperty({ description: 'This will be the ID of the customer_segment the field is assigned to' })
    @IsUUID()
    @IsNotEmpty()
    readonly customer_segment: string
}