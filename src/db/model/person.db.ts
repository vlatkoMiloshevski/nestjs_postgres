import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class NewPerson {
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
}