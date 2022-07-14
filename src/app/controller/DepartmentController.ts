import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
//import { EmployeeService } from "../../service/EmployeeService";
import { DepartmentService } from "../../service/DepartmentService";
import validationMiddleware from "../middleware/validationMiddleware";
import { createDepartmentDto } from "../dto/createDepartment";
import authorize from "../middleware/authorize";

class DepartmentController extends AbstractController {
    constructor(private DepartmentService: DepartmentService) {
        super(`${APP_CONSTANTS.apiPrefix}/department`);
        this.initializeRoutes();
    }
    protected initializeRoutes() {
        this.router.get(`${this.path}`, this.getAllDepartments);
        this.router.post(`${this.path}`, validationMiddleware(createDepartmentDto,APP_CONSTANTS.body),this.createDepartment);
        this.router.put(`${this.path}/:id`, this.updateDepartment);

        this.router.get(`${this.path}/:id`, this.getById);
        this.router.delete(`${this.path}/:id`,  this.deleteDepartment);





    }
    private getAllDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {

            response.status(200);
            response.send(await this.DepartmentService.getAlldepartment());
        } catch (error) {
            return next(error);
        }
    }
    private createDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {

            response.status(200);
            response.send(await this.DepartmentService.createdepartment(request.body));
        } catch (error) {
            return next(error);
        }
    }



    private updateDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
         
          response.status(200);
          const data = await this.DepartmentService.updateDepartment(request.params.id, request.body);
          response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK' ));
        } catch (error) {
          return next(error);
        }
      }

      private getById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {

            response.status(200);
            const data = await this.DepartmentService.getById(request.params.id);
            response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
        } catch (error) {
            return next(error);
        }
    }


    private deleteDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {

            response.status(200);
            const data = await this.DepartmentService.deleteDepartment(request.params.id);
            response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
        } catch (error) {
            return next(error);
        }
    }



}







export default DepartmentController;
