import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class UpdateCompanyCustomerSegmentDetailsDetailsDto {
    @ApiProperty({ description: 'This is the title of the company customer segment details '})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly title: string

    
    @ApiProperty({ description: 'This is the color code assigned to this company customer segmentation detail '})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly color_code: string

    @ApiProperty({ description: 'This is the description of the description company customer segment details'})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional()
    readonly general_details: string
}