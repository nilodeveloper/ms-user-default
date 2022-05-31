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