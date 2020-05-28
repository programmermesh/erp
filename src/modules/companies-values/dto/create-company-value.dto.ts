import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString, IsNotEmpty } from "class-validator"

export class CreateCompanyValueDto {

    @ApiProperty({ description: 'This is the title/value of the company value '})
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @ApiProperty({ description: 'The summary description'})
    @IsNotEmpty()
    @IsString()
    readonly summary: string

    @ApiProperty({ description: 'This is the color code assigned to the company_value'})
    @IsNotEmpty()
    @IsString()
    readonly color_code: string
}