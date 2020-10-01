import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateCustomerSegTypeSubcategoryDto {
    @ApiProperty({ description: 'This is the title of the customer segementation subcategory'})
    @IsNotEmpty()
    @IsString()
    readonly title: string
}
