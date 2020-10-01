import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUUID } from "class-validator"

export class UpdateCustomerSegTypeSubcategoryDto {
    @ApiProperty({ description: 'This is the title of the customer segementation subcategory'})
    @IsNotEmpty()
    @IsString()
    readonly title: string
}