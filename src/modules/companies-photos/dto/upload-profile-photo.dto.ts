import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UploadProfilePhotoDto {
    @ApiProperty({ description: "This is the photo file url to upload" })
    @IsNotEmpty()
    @IsString() readonly profile_photo: string
}