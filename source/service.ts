import * as repository from './repository';
import * as response from  './response';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config'

export async function login(credentials: any) {
    try {
        const user = await repository.getPasswordByEmail(credentials.email);
        const match = await bcrypt.compare(credentials.password, user.password);
        if(!process.env.SECRET){
            throw "Ocorreu um erro"
        }
        if(match){
            const token = jwt.sign({ email: user.email }, process.env.SECRET);
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

export async function getUser(id: number) {
    try {
        const user = await repository.getUser(id);
        return response.userFormated(user);
    } catch (e) {
        return { 
            message: e
        }
    }
}
