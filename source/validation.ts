import { z } from "zod";
import * as jwt from 'jsonwebtoken';
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

export function token(token: string) {
    try{
        if(!process.env.SECRET){
            throw {
                message: "Ocorreu um erro no servidor",
                statusCode: 500
            }
        }
        return jwt.verify(token, process.env.SECRET, function(err, decoded: any) {
            if(err){
                throw {
                    message: "Token inválido",
                    statusCode: 401
                }
            }else{
                console.log("decoded", decoded.email)
                return decoded.email;
            }
        });
    }catch(e){
        return e
    }
}