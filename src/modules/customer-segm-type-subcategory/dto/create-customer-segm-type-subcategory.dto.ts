import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateCustomerSegTypeSubcategoryDto {
    @ApiProperty({ description: 'This is the title of the customer segementation subcategory'})
    @IsNotEmpty()
    @IsString()
    readonly title: string

    /* Many subcategories can be under one segmentation_type */
    @ApiProperty({ description: "This is the ID of the main customer segmentation" })
    @IsUUID()
    @IsNotEmpty()
    readonly customer_segmentation_typesId: string
}