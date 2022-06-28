import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { User } from '../entity/User';
import { AppDataSource } from '../data-source';
import { MailService } from './mail-service';
import { TokenService } from './token-service';
import { UserDto } from '../dtos/user-dto';
import { ApiError } from '../exeptions/api-error';

const userRepository = AppDataSource.getRepository(User);

const mailService = new MailService();
const tokenService = new TokenService();

export class UserService {
  async registration(email, password) {
    const candidate = await AppDataSource.getRepository(User).findOne({
      where: { email: email },
    });

    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const newUser = await userRepository.create({
      email: email,
      password: hashPassword,
      activationLink: activationLink,
    });

    await mailService.sendActivationMail(
      email,
      `http://localhost:3000/activate/${activationLink}`
    );

    const user = await userRepository.save(newUser);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await userRepository.findOne({ where: { activationLink } });
    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации');
    }
    user.isActivated = true;
    await userRepository.save(user);
  }

  async login(email: string, password: string) {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
}
