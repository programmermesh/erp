import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsUUID, IsNotEmpty, IsString, IsOptional } from "class-validator"

export class UpdateCustomerProblemsDto {
    @ApiProperty({ description: 'This is the title of the customer problem'})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsString() readonly title: string

    @ApiProperty({ description: 'This is the description of the customer problem'})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsString() readonly description: string
}