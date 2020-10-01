import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from "class-validator"

const name = 'contract'

export class UpdateCompanyContractDto {

    @ApiProperty({ description: `This is the title of the ${name}`})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly title: string

    @ApiProperty({ description: `This is the type of the ${name}`})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly type: string

    @ApiProperty({ description: `This is the notes of the ${name}`})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly notes: string    

    @ApiProperty({ description: `This is the link of the ${name}`})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly link: string

    @ApiProperty({ description: `This is the url for cover_image of the ${name}`})
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly cover_image: string
}