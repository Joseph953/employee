import { IsNumber, IsString } from "class-validator";

export class addressDto {
    @IsString()
    public address: string;

}