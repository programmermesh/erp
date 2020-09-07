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
    readonly segmentationId: string

    @ApiProperty({ description: 'This is the ID of the entry to associate with'})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsString()
    readonly group_index: string

}