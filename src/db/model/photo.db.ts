import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class NewPhoto {
    @ApiProperty()
    @IsNotEmpty()
    personid: number;
    @ApiProperty()
    @IsNotEmpty()
    description: string;
}

export class Photo {
    @ApiProperty()
    @IsNotEmpty()
    photoid: number;
    @ApiProperty()
    @IsNotEmpty()
    personid: number;
    @ApiProperty()
    @IsNotEmpty()
    description: string;
}