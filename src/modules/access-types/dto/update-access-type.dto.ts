import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class UpdateAccessTypeDto {
    @ApiProperty({ description: "This is the name(update) of the access type" })
    @IsString()
    @IsNotEmpty()
    readonly name: string
}