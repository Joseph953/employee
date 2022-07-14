import { Type } from "class-transformer";
import { IsDefined, IsEnum, IsNumber, IsString, validate, ValidateNested } from "class-validator";
import { Role } from "../entities/Employee";
import { addressDto } from "./addressdto";

export class editEmployeeDto {
    @IsString()
    public name?: string;

    @IsString()
    public username?: string;

    @IsNumber()
    public age?: number;

    @IsString()
    public departmentId?: string;
    @IsEnum(Role)
    public role?: Role;
    @IsString()
    public password?: string;

    @ValidateNested()
    @IsDefined()
    @Type(() => addressDto)
    public address?: addressDto

}