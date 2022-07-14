import { create } from "domain";
import { getConnection, ObjectLiteral, ReturningStatementNotSupportedError } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository {
    async getAllEmployees() {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({ relations: ["department", "address"] });
    }

    async createEmployee(empBody: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        const emp = employeeRepo.create(empBody);
        return await emp.save();
    }
    async updateEmployee(id: string, empBody: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        const emp = employeeRepo.update(id, empBody);
        return emp;
    }


    async getById(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const emp = employeeRepo.find({ id: id });
        return emp;
    }

    async deleteEmployee(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const emp = employeeRepo.softDelete({ id: id });
        return emp;
    }

    public async getEmployeeByName(username: string) {
        //console.log("getEmployeeByName: " + username)
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name: username },
        });
        console.log(employeeDetail)
        return employeeDetail;
    }

}