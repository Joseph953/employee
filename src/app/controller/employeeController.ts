import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../../service/EmployeeService";
import authorize from "../middleware/authorize";
import { JsonWebTokenError } from "jsonwebtoken";
import validationMiddleware from "../middleware/validationMiddleware";
import { type } from "os";
import { CreateEmployeeDto } from "../dto/createEmployee";
import { Role } from "../entities/Employee";
class employeeController extends AbstractController {
    constructor(private employeeService: EmployeeService) {
        super(`${APP_CONSTANTS.apiPrefix}/employee`);
        this.initializeRoutes();
    }
    protected initializeRoutes() {
        this.router.get(`${this.path}`, authorize(), this.getAllEmployee);
        this.router.post(`${this.path}`, authorize([Role.admin, Role.hr]), validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body), this.createEmployee);
        this.router.put(`${this.path}/:id`, authorize([Role.admin, Role.hr]), this.updateEmployee);
        this.router.get(`${this.path}/:id`, authorize(), this.getById);
        this.router.delete(`${this.path}/:id`, authorize([Role.admin, Role.hr]), this.deleteEmployee);
        this.router.post(`${this.path}/login`, this.login);


        //  this.router.post(`${this.path}`,validationMiddleware(CreateEmployeeDto,APP_CONSTANTS.body),this.createEmployee);


    }
    private getAllEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            response.status(200);
            response.send(this.fmt.formatResponse(await this.employeeService.getAllEmployees(), Date.now() - request.startTime, 'OK'));
        } catch (error) {
            return next(error);
        }
    }

    private createEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            response.status(200);

            const data = await this.employeeService.createEmployee(request.body);
            response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
        } catch (error) {
            return next(error);
        }
    }
    private updateEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {

            response.status(200);
            const data = await this.employeeService.updateEmployee(request.params.id, request.body);
            response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
        } catch (error) {
            return next(error);
        }
    }

    private getById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {

            response.status(200);
            const data = await this.employeeService.getById(request.params.id);
            response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
        } catch (error) {
            return next(error);
        }
    }


    private deleteEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {

            response.status(200);
            const data = await this.employeeService.deleteEmployee(request.params.id);
            response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
        } catch (error) {
            return next(error);
        }
    }




    private login = async (

        request: RequestWithUser,
        response: Response,
        next: NextFunction
    ) => {
        console.log(request.body.name);
        const loginData = request.body;
        const loginDetail = await this.employeeService.employeeLogin(
            request.body.name,
            request.body.password
        );
        response.send(
            this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
        );
    };


}
export default employeeController;
