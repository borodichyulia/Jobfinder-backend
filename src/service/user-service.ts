import { User } from "../entity/User"
import { AppDataSource } from "../data-source"
import * as bcrypt from 'bcrypt';
import * as uuid from "uuid";

import { MailService } from "./mail-service";
import { TokenService } from "./token-service";
import { UserDto } from "../dtos/user-dto";

import { ApiError } from "../exeptions/api-error";

const userRepository = AppDataSource.getRepository(User);

const mailService = new MailService;
const tokenService = new TokenService;

export class UserService{
    async registration(email, password){
        const candidate = await AppDataSource.getRepository(User).findOne({where: {email: email}})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

        const user = await userRepository.create({
            email: email, 
            password: hashPassword,  
            activationLink: activationLink})

        await mailService.sendActivationMail(email, `http://localhost:3000/users/activate/${activationLink}`);
     
        const user1 = await userRepository.save(user);
        const userDto = new UserDto(user1); // id, email, isActivated
        console.log(userDto);
        const tokens = tokenService.generateTokens({...userDto});
      
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink){
        const user = await userRepository.findOne({where: {activationLink}});
        if(!user){
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await userRepository.save(user);

    }
}