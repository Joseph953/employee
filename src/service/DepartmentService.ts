import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { createDepartmentDto } from "../app/dto/createDepartment";
import { Department } from "../app/entities/Department";
import { DepartmentRespository } from "../app/repository/DepartmentRepository";

export class DepartmentService {
    /*   getAllDepartments(){
           const departmentResp = [
               {
                   "id": "af168383-b350-4894-8ca3-34811ffa34ac",
                   "name": "joseph",
                   "joiningDate": "2021-07-15T14:48:00.000Z",
                   "role": "dev",
                   "experience": 1,
                   "status": "Active",
                   "designation": 'Associate',
                   "employeeProofUrl": "erer",
                   "email": "test@test.com",
                   "password": "123456",
                   "departments": []
               },
               {
                   "id": "763a5477-c283-4724-94ce-6dc7a5688685",
                   "name": "hawari",
                   "joiningDate": "2020-01-08T10:53:09.506Z",
                   "role": "dev",
                   "experience": 5,
                   "status": "Active",
                   "designation": "Senior",
                   "employeeProofUrl": "http://",
                   "email": "test@gmail.com",
                   "password": "teereddf",
                   "departments": [
                       {
                           "id": "b4fec1fd-5921-4c0e-883c-0904c4a70bad",
                           "name": "developers"
                       }
                   ]
               }
           ]
           return departmentResp;
       }*/


    constructor(private departmentrepo: DepartmentRespository) { }
    async getAlldepartment() {
        return this.departmentrepo.getAllDepartments();
    }
    async createdepartment(departmentData: createDepartmentDto) {
        const dep=plainToClass(Department,{
            name:departmentData.name
        })
        return await this.departmentrepo.addDepartment(dep);
    }
    async updateDepartment(id: string, departmentBody: createDepartmentDto){
        const dep=plainToClass(Department, {
            name:departmentBody.name
        })
        return await this.departmentrepo.updateDepartment(id, dep);

    }

    async getById(id: string){
        return await this.departmentrepo.getById(id);

    }
    async deleteDepartment(id: string){
        return await this.departmentrepo.deleteDepartment(id);

    }


}


