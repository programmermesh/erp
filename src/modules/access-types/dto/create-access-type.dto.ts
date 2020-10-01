import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateAccessTypeDto {
    @ApiProperty({ description: "This is the name of the access type" })
    @IsString()
    @IsNotEmpty()
    readonly name: string
}