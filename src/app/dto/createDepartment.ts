import { IsString } from "class-validator/decorator/decorators";

export class createDepartmentDto {
    @IsString()
    public name: string;

}