import express from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken from "jsonwebtoken";
import APP_CONSTANTS from "../constants";
import { Role } from "../entities/Employee";


const authorize = (permittedRoles?: Role[]) => {
  return async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const token = getTokenFromRequestHeader(req);
      jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);

      const data: any =jsonwebtoken.decode(token);
      const role=data['role']
      console.log(data);

      if(permittedRoles && !(permittedRoles.includes(role))){
        throw new UserNotAuthorizedException()
      }
      return next();
    } catch (error) {
      return next(new UserNotAuthorizedException());
    }
  };
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const tokenWithBearerHeader = req.header(
    `${APP_CONSTANTS.authorizationHeader}`
  );

  if (tokenWithBearerHeader) {
    return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
  }
  return "";
};

export default authorize;