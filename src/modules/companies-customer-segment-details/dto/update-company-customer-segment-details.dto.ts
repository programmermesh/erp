import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator"

export class UpdateCompanyCustomerSegmentDetailsDetails {
    @ApiProperty({ description: 'This is the title of the company customer segment details '})
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly title: string

    @ApiProperty({ description: 'This is the description of the description company customer segment details'})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional()
    readonly details: string
}