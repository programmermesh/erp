import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEnum } from "class-validator"

export class UpdateCompanyChannelCategoryDto {
    @ApiProperty({ description: 'This is the name of the Channel Category'})
    @IsString()
    @IsNotEmpty()
    readonly name: string
}