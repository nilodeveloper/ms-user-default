import * as jwt from 'jsonwebtoken';
import * as repository from '../repository';
import * as messages from '../constants/messages.json';

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