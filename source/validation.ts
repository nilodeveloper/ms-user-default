import { z } from "zod";
import * as jwt from 'jsonwebtoken';
import * as repository from './repository';
import * as messages from './constants/messages.json';
import 'dotenv/config';

export function user(user: any) {
    const validationUser = z.object({
        name: z.string(),
        lastname: z.string(),
        login: z.string(),
        email: z.string(),
        password: z.string(),
    });
    const validation = validationUser.parse(user);
    return user;
}

export function credentials(credentials: any) {
    const validationCredentials = z.object({
        email: z.string(),
        password: z.string(),
    });
    const validation = validationCredentials.safeParse(credentials);
    console.log(validation)
    return validation;
}

export function token(token: string) {
    try{
        if(!process.env.SECRET){
            throw {
                message: "Ocorreu um erro no servidor",
                statusCode: 500
            }
        }

        const info = jwt.verify(token, process.env.SECRET, async function(err, decoded: any) {
            if(err){
                return {
                    message: messages.token.invalid_token,
                    statusCode: 401
                }
            }else{
                const validTokenTime = await repository.getValidTokenTime(decoded.email);
                if(validTokenTime > decoded.generated){
                    return {
                        message: "Token inválido, usuário deslogado de todos os dispositivos",
                        statusCode: 403
                    }
                }
                return {email: decoded.email, validTokenTime: decoded.validTokenTime};
            }
        });
        return info;
    }catch(e){
        return e
    }
}

export function tokenAndEmail(token: string) {
    try{
        if(!process.env.SECRET){
            throw {
                message: "Ocorreu um erro no servidor",
                statusCode: 500
            }
        }

        const info = jwt.verify(token, process.env.SECRET, async function(err, decoded: any) {
            if(err){
                return {
                    message: "Token inválido",
                    statusCode: 401
                }
            }else{
                const validTokenTime = await repository.getValidTokenTime(decoded.email);
                if(validTokenTime > decoded.generated){
                    return {
                        message: "Token inválido, usuário deslogado de todos os dispositivos",
                        statusCode: 403
                    }
                }
                const email = await repository.verifyEmail(decoded.email);
                if(!email){
                    return {
                        message: "Parece que seu email foi modificado. Por favor logue-se novamente",
                        statusCode: 403
                    }
                }
                return {email: decoded.email, validTokenTime: decoded.validTokenTime};
            }
        });
        return info;
    }catch(e){
        return e
    }
}