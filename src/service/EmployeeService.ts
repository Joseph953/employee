import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { Employee } from "../app/entities/Employee";
import HttpException from "../app/exception/HttpException";
import IncorrectUsernameOrPasswordException from "../app/exception/IncorrectUsernameOrPasswordException";
import UserNotAuthorizedException from "../app/exception/UserNotAuthorizedException";
import { EmployeeRespository } from "../app/repository/EmployeeRepository";
const bcrypt=require("bcrypt");
import jsonwebtoken=require("jsonwebtoken");
import { CreateEmployeeDto } from "../app/dto/createEmployee";
import { editEmployeeDto } from "../app/dto/editEmployee";

export class EmployeeService{

    constructor(private employeerepo: EmployeeRespository){}
    async getAllEmployees(){
        return this.employeerepo.getAllEmployees();
    }

    async postAllEmployees(){
        return this.employeerepo.createEmployee;
    }
  /*  getAllEmployees(){
        const employeeResp = [
            {
                "id": "af168383-b350-4894-8ca3-34811ffa34ac",
                "name": "Rahul",
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
        return employeeResp;
    }*/
    
    async updateEmployee(id: string, employeeDetails: editEmployeeDto){
        const empBody=plainToClass(Employee,{
            name: employeeDetails.name,
            username: employeeDetails.username,
            password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
            age: employeeDetails.age,
            departmentId: employeeDetails.departmentId,
            role: employeeDetails.role, 
            address: employeeDetails.address
        })
        return await this.employeerepo.updateEmployee(id, empBody);

    }
    async getById(id: string){
        return await this.employeerepo.getById(id);

    }
    async deleteEmployee(id: string){
        return await this.employeerepo.deleteEmployee(id);

    }


    public async createEmployee(employeeDetails: CreateEmployeeDto) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username: employeeDetails.username,
                password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                role: employeeDetails.role, 
                address: employeeDetails.address
            });
           const save = await this.employeerepo.createEmployee(newEmployee);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee");
        }
    }


    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        console.log("employeeLogin: " + name);
        const employeeDetails = await this.employeerepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
          
        }
        console.log(employeeDetails);
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "role":employeeDetails.role
          };
          const token = this.generateAuthTokens(payload);

          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  



 }