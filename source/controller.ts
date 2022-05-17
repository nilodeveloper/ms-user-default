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