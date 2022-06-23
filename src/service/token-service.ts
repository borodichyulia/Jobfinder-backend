import * as jwt from 'jsonwebtoken'
import { Token } from "../entity/Token"
import { AppDataSource } from "../data-source"

const tokenRepository = AppDataSource.getRepository(Token);

export class TokenService {
    generateTokens(payload) {
      
        const accessToken = jwt.sign(payload, `${process.env.JWT_ACCESS_SECRET}`, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, `${process.env.JWT_REFRESH_SECRET}`, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        // console.log(userId);
        // const tokenData = await tokenRepository.findBy({
        //     user: userId
        // })
        // if(tokenData) {
        //     // tokenData[userId].refreshToken = refreshToken;
        //     // const token1 =await tokenRepository.save(tokenData[0]);
        //     // console.log(token1);
        //     // return(tokenData);
        //     console.log(tokenData);
        // }

        const token = await tokenRepository.create({
            user: userId,
            refreshToken: refreshToken
        })
        const token1 = await tokenRepository.save(token);
       
        return(token1);

    }
}