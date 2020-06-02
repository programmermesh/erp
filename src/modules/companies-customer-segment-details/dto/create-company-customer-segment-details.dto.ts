import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator"

export class CreateCompanyCustomerSegmentDetailsDetails {
    @ApiProperty({ description: 'This is the title of the company customer segment details '})
    @IsString()
    @IsNotEmpty()
    readonly title: string

    @ApiProperty({ description: 'This is the description of the description company customer segment details'})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly details: string
    
    @ApiProperty({ description: "This is the ID of the company customer segments table" })
    @IsUUID()
    @IsNotEmpty()
    readonly company_customer_segments:string
}