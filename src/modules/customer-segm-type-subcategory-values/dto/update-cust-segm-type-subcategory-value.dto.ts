import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty} from "class-validator"

export class UpdateCustSegTypesSubcategoriesValueDto {
    @ApiProperty({ description: 'This is the title of the subcategory value'})
    @IsString()
    @IsNotEmpty()
    readonly value: string
}