import * as repository from './repository';
import * as response from  './response';
import * as bcrypt from 'bcrypt';

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

/*

        bcrypt.compare(user.passwords.old, hash, function(err, result) {
            if(result){
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(user.passwords.new, salt, async function(err, newHash) {
                        const a = await repository.updatePassword(user.id, newHash);
                        resultado = "nilo"
                        console.log(resultado);
                    });
                });
                console.log(resultado);
            }else{
                resultado = "erika"
                console.log('deu ruim')
                return { message: "Não foi possível trocar sua senha. Senha atual está errada" };
            }
            console.log('resultado', resultado);
        });



*/