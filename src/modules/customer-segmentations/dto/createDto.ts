import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID, IsBoolean } from "class-validator"

export class CreateCustomerSegmentationDto {

    @ApiProperty({ description: 'This is the value assigned to the relation to the segmentation type '})
    @IsNotEmpty()
    @IsString()
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

    @ApiProperty({ description: 'This will be used by specific fields to delete previous entries before saving'})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsBoolean()
    readonly delete_previous_entries: boolean

}