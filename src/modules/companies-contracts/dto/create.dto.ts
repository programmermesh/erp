import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from "class-validator"

const name = 'contract'

export class CreateCompanyContractDto {

    @ApiProperty({ description: `This is the title of the ${name}`})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: `This is the type of the ${name}`})
    @IsString()
    @IsNotEmpty()
    readonly type: string

    @ApiProperty({ description: `This is the notes of the ${name}`})
    @IsString()
    @IsNotEmpty()
    readonly notes: string    

    @ApiProperty({ description: `This is the link of the ${name}`})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    readonly link: string

    @ApiProperty({ description: `This is the url for cover_image of the ${name}`})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly cover_image: string
}