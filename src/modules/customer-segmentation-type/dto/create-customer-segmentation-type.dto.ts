import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty } from "class-validator"

export class CreateCustomerSegmentationTypeDto {
    @ApiProperty({ description: 'This is the title of the customer_segmentation_type'})
    @IsString()
    @IsNotEmpty()
    readonly title: string
}

/**
 * demographic
 * geography
 * behavioral
 * psychographic
*/