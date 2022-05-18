import * as repository from './repository';
import * as response from  './response';

export async function saveUser(user: any) {
    try {
        const newUser = await repository.saveUser(user);
        return response.userFormated(newUser);
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