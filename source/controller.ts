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

export async function logoutAll(token: string) {
    try {
        const result = await service.logoutAll(token);
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

export async function getProfile(token: string) {
    try {
        const profile = await service.getProfile(token);
        return profile;
    } catch (err: any) {
        return { 
            message: err.message || "Erro interno no servidor",
            statusCode: err.statusCode || 500
        }
    }
}

export async function getUser(login: string) {
    try {
        const user = await service.getUser(login);
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
        return result;
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}