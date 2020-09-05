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

    @ApiProperty({ description: 'This is the index to group the entry with'})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsNumber()
    readonly group_index: number

    @ApiProperty({ description: 'This will be used by specific fields to delete previous entries before saving'})
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional()
    @IsBoolean()
    readonly delete_previous_entries: boolean

}