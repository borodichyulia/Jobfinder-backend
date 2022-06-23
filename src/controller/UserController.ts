import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import { UserService } from "../service/user-service";

const userRepository = AppDataSource.getRepository(User);
const userService = new UserService;
export class UserController {



    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('hello');
            const { email, password } = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            res.send(userData);
        } catch (e) {
           next(e);
        }
    }

    // async login(req, res, next) {
    //     try {

    //     } catch (e) {

    //     }
    // }

    // async logout(req, res, next) {
    //     try {

    //     } catch (e) {

    //     }
    // }

    // async getUsers(request: Request, response: Response) {




    //         response.send(['123']);

    // }
    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect('https://yandex.ru/');
        } catch(e){
            next(e);
        }
    }


}