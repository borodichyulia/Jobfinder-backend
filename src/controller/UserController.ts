import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { UserService } from '../service/user-service';
import { ApiError } from '../exeptions/api-error';
import { Constants } from '../constants/constants';

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService();
export class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(Constants.messageErrorValidation),
          errors.array()
        );
      }
      const { email, firstName, lastName, password, type } = req.body;
      const userData = await userService.registration(
        email,
        firstName,
        lastName,
        password,
        type
      );
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.send(userData);
    } catch (e) {
      next(e);
    }
  }
  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.send(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
}
