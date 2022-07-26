import * as jwt from 'jsonwebtoken';

import { Token } from '../entity/Token';
import { AppDataSource } from '../data-source';

const dotenv = require('dotenv');
dotenv.config();

const tokenRepository = AppDataSource.getRepository(Token);

export class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, `${process.env.JWT_ACCESS_SECRET}`, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(
      payload,
      `${process.env.JWT_REFRESH_SECRET}`,
      { expiresIn: '30d' }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenRepository.findOne({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      const token = await tokenRepository.save(tokenData);
      return token;
    }

    const newToken = await tokenRepository.create({
      user: userId,
      refreshToken: refreshToken,
    });
    const token = await tokenRepository.save(newToken);

    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await tokenRepository.delete({
      refreshToken: refreshToken,
    });
    return tokenData;
  }
}
