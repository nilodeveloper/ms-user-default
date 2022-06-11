import * as repository from './repository';
import * as response from  './response';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as validation from './validation';
import * as messages from './messages.json';
import * as utils from './utils';
import 'dotenv/config'

export async function login(credentials: any) {
    try {
        const user = await repository.getPasswordByEmail(credentials.email);
        const match = await bcrypt.compare(credentials.password, user.password);
        if(!process.env.SECRET){
            throw messages.invalid_secret
        }
        if(match){
            const token = jwt.sign(
                    { email: user.email, generated: utils.generateTimestampNow() },
                    process.env.SECRET
                 );
            return response.loginSuccess(token);
        }else{
            return response.loginFail();
        }
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}

export async function logoutAll(token: string) {
    try {
        const result: any = await validation.token(token);
        if(result.statusCode){
            return response.invalidToken();
        }
        const newTime = await repository.registerValidTokenTime(result.email);
        return response.logoutAll();
    } catch (err: any) {
        return { 
            message: err.message,
            statusCode: err.statusCode,
        }
    }
}

export async function saveUser(user: any) {
    try {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(user.password, salt, async function(err, hash) {
                user.password = hash;
                const newUser = await repository.saveUser(user);
                return response.userFormated(newUser);
            });
        });
    } catch (e) {
        return { 
            message: e
        }
    }
}

export async function getProfile(token: string) {
    try {
        const result: any = await validation.token(token);
        if(result.statusCode){
            return result
        }else{
            const user = await repository.getUserByEmail(result.email);
            return response.getProfile(user);
        }
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}

export async function changePassword(user: any) {
    try {
        const hash = await repository.checkPassword(user.id) || "";
        const match = await bcrypt.compare(user.passwords.old, hash);
        if(match){
            const saltRounds = 10;
            bcrypt.hash(user.passwords.new, saltRounds, async function(err, newHash) {
                await repository.updatePassword(user.id, newHash);
            });
        }else{
            return {
                message: messages.invalid_current_password,
                statusCode: 401 
            }
        }
        return { 
            message: messages.success_change_password,
            statusCode: 200
        }
    } catch (e) {
        return { 
            message: "e",
            statusCode: 500
        }
    }
}

export async function changeEmail(token: string, newEmail: string) {
    try {
        const result: any = await validation.token(token);
        if(result.statusCode){
            return result
        }else{
            const user = await repository.updateEmail(result.email, newEmail);
            return response.getProfile(user);
        }
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}

export async function getUser(login: string) {
    try {
        const user = await repository.getUser(login);
        if(user)
            return response.userFormated(user);
        else
            return {
                message: messages.user_not_found,
                statusCode: 400
            }
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}
