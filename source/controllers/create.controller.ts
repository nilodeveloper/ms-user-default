import * as validation from '../validation';
import * as service from '../service';
import { User } from '../interface';

export async function createUser(user: User) {
    try {
        const userValided = validation.user(user);
        const newUser = await service.saveUser(userValided);
        return newUser;
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}