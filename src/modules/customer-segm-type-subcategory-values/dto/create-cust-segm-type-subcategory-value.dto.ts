import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsUUID } from "class-validator"

export class CreateCustSegTypesSubcategoriesValueDto {

    @ApiProperty({ description: 'This is the title of the subcategory value'})
    @IsString()
    @IsNotEmpty()
    readonly value: string

    @ApiProperty({ description: "This is the ID of the Customer segmentation subcategory" })
    @IsUUID()
    @IsNotEmpty()
    readonly cust_seg_types_subcategoriesId: string
}
