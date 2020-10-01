import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UploadLogoDto {
    @ApiProperty({ description: "This is the logo file url to upload" })
    @IsNotEmpty()
    @IsString() readonly logo: string
}