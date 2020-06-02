import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsUUID } from "class-validator"

export class CreateCustSegTypesSubcategoriesValueDto {

    @ApiProperty({ description: 'This is the title of the subcategory value'})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: "This is the ID of the Customer segmentation subcategory" })
    @IsUUID()
    @IsNotEmpty()
    readonly cust_seg_types_subcategoriesId: string

    /* Many subcategory values can be under one segment details entry */
    @ApiProperty({ description: "This is the ID of the Company customer segment details details tale" })
    @IsUUID()
    @IsNotEmpty()
    readonly company_customer_segment_details: string
}