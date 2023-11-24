/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import _ from 'lodash';
import { AuthService } from "./auth.service";
import { RegisterInput } from './auth.schema';
import { privateFields } from '../user/user.model';


export class AuthController {
  public authService = new AuthService();

  public registerUser = async (req: Request<{}, {}, RegisterInput>, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const user = await this.authService.signup(userData);

      const data = _.omit(user, privateFields);

      res.status(201).json({
        success: true,
        message: 'User created successfully.',
        data
      });
    } catch (error: any) {
      next(error);
    }
  }
}