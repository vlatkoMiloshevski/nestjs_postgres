import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Photo } from "src/db/model/photo.db";

export class NewPerson {
    @ApiProperty()
    @IsNotEmpty()
    personid: number;
    @ApiProperty()
    @IsNotEmpty()
    lastname: string;
    @ApiProperty()
    @IsNotEmpty()
    firstname: string;
    @ApiProperty()
    @IsNotEmpty()
    city: string;
    @ApiProperty()
    @IsNotEmpty()
    address: string;
}

export class Person {
    @ApiProperty()
    @IsNotEmpty()
    personid: number;
    @ApiProperty()
    @IsNotEmpty()
    lastname: string;
    @ApiProperty()
    @IsNotEmpty()
    firstname: string;
    @ApiProperty()
    @IsNotEmpty()
    city: string;
    @ApiProperty()
    @IsNotEmpty()
    address: string;
    @ApiProperty()
    @IsNotEmpty()
    photoList: Photo[];
}