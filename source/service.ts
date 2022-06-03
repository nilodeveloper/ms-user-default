import * as repository from './repository';
import * as response from  './response';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as validation from './validation';
import 'dotenv/config'

export async function login(credentials: any) {
    try {
        const user = await repository.getPasswordByEmail(credentials.email);
        const match = await bcrypt.compare(credentials.password, user.password);
        if(!process.env.SECRET){
            throw "Ocorreu um erro"
        }
        if(match){
            const token = jwt.sign({ email: user.email, generated: Math.floor(Date.now() / 1000) }, process.env.SECRET);
            return response.loginSuccess("Login feito com sucesso!", token);
        }else{
            return response.loginFail("Falha de login. Usuário ou senha incorretos");
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
        const newTime = await repository.registerValidTokenTime(result.email);
        return {
            data:{
                newTime
            },
            message: "Conta deslogada de todos os dispositivos com sucesso!",
            statusCode: 200
        }
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
                message: "Erro ao tentar alterar senha. Senha atual não está correta",
                statusCode: 401 
            }
        }
        return { 
            message: "Senha alterada com sucesso",
            statusCode: 200
        }
    } catch (e) {
        return { 
            message: "e",
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
            return {message: "usuário não encontrado", statusCode: 400}
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}
