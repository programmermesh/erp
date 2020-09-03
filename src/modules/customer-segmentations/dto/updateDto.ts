import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID } from "class-validator"

export class UpdateCustomerSegmentationDto {

    @ApiProperty({ description: 'This is the value assigned to the relation to the segmentation type '})
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    readonly segment_value: string

    @ApiProperty({ description: 'This is the segmentation ID' })
    @IsUUID()
    @IsNotEmpty()
    readonly segmenationId: string

    @ApiProperty({ description: 'This is the index to group the entry with'})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsNumber()
    readonly group_index: number

}