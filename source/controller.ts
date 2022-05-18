import * as validation from './validation';
import * as service from './service';

export async function createUser(user: any) {
    try {
        const userValided = validation.user(user);
        const newUser = await service.saveUser(userValided);
        return newUser;
    } catch (e) {
        return { 
            message: e 
        }
    }
}

export async function getUser(id: number) {
    try {
        const user = await service.getUser(id);
        return user;
    } catch (e) {
        return { 
            message: e 
        }
    }
}