import * as response from  '../response';
import * as repository from '../repository';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as validation from '../validation';
import * as messages from '../constants/messages.json';
import * as utils from '../utils';
import 'dotenv/config'
import { Credentials } from '../interface';

export async function login(credentials: Credentials) {
    try {
        const result:any = validation.credentials(credentials);
        const user:any = await repository.getPasswordByEmail(credentials.email);

        if(!result.success){
            throw await response.invalidCredentials(credentials, result)
        }

        if(user?.statusCode == 403){
            throw {
                message: "Por favor, faça a confirmação no seu email",
                statusCode: 403
            }
        }
        
        const match = await bcrypt.compare(credentials.password, user.password);
        if(!process.env.SECRET){
            throw messages.invalid_secret
        }
        console.log("maaaaaaaaaaaaaaaaatch",match)
        if(match){
            const token = jwt.sign(
                    { email: user.email, generated: utils.generateTimestampNow() },
                    process.env.SECRET
                 );
            return response.loginSuccess(token);
        }else{
            return response.loginFail();
        }
    } catch (e: any) {
        return { 
            message: e.message || e,
            data: e.data || {},
            statusCode: e.statusCode || 500
        }
    }
}