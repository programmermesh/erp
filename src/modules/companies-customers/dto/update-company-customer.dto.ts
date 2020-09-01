import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsUUID, IsOptional } from "class-validator"
import { CUSTOMERS_SEGMENTS} from '../../../common/enum_values'

export class UpdateCompanyCustomerDto {

    @ApiProperty({ description: 'This is the title of the customer '})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly name: string

    @ApiProperty({ description: 'This is the type of the customer [primary or secondary]'})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly type: string

    @ApiProperty({ description: 'This is the customer segment', enum: CUSTOMERS_SEGMENTS})
    @IsEnum(CUSTOMERS_SEGMENTS)
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    readonly segment: CUSTOMERS_SEGMENTS

    @ApiProperty({ description: 'This is the color code of the customer'})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly color_code: string

    @ApiProperty({ description: 'This is the general description of the customer'})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly description: string

}