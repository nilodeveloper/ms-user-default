import * as validation from './validation';
import * as service from './service';

export async function login(credentials: any) {
    try {
        const result = await service.login(credentials);
        return result;
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}

export async function createUser(user: any) {
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

export async function getUser(id: number) {
    try {
        const user = await service.getUser(id);
        return user;
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}

export async function changePassword(user: any) {
    try {
        const result = await service.changePassword(user);
        console.log("result no controller", result);
        return result;
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}