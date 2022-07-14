import { getConnection, ObjectLiteral } from "typeorm";
import { Department } from "../entities/Department";
import { Employee } from "../entities/Employee";

export class DepartmentRespository {
    async getAllDepartments() {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }
    async addDepartment(deptBody: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        const dept = await departmentRepo.create(deptBody);
        return dept.save();
    }


    async updateDepartment(id: string, departmentBody: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        const dep = departmentRepo.update(id, departmentBody);
        return dep;
    }


    async getById(id: string) {
        const departmentRepo = getConnection().getRepository(Department);
        const dep = departmentRepo.find({ id: id });
        return dep;
    }
    async deleteDepartment(id: string) {
        const departmentRepo = getConnection().getRepository(Department);
        const dep = departmentRepo.softDelete({ id: id });
        return dep;
    }



}