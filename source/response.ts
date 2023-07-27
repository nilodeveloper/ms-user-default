import * as messages from './constants/messages.json';
import * as interfaceError from './errors/interface.error'
import * as genericError from './errors/generic.error'
import * as userOrPasswordIncorrect from './errors/userOrPass.error'
import * as userAlreadyExist from './errors/userAlreadyExist.error'
import {Credentials} from './interface';

export async function userFormated(user: any) {
    try {
        const {name, lastname, login} = user;
        return {
            data:{
                name,
                lastname,
                login,
            },
            message: messages.get_user_success,
            statusCode: 200,
        };
    } catch (err) {
        return genericError.execute(err)
    }
}

export async function invalidCredentials(credentials: Credentials, result: any) {
    try {
        return interfaceError.execute(credentials, result)
    } catch (err: any) {
        return genericError.execute(err)
    }
}

export async function getProfile(user: any) {
    try {
        return {
            data: {
                name: user.name,
                lastname: user.lastname,
                login: user.login,
                email: user.email,
            },
            message: messages.get_user_success,
            statusCode: 200,
        }
    } catch (err: any) {
        return genericError.execute(err)
    }
}

export async function loginSuccess(token: string) {
    try {
        return {
            data:{
                token: token,
            },
            message: messages.login_success,
            statusCode: 200
        }
    } catch (err) {
        return genericError.execute(err)
    }
}

export async function userAlreadyExists() {
    try {
        return userAlreadyExist.execute()
    } catch (err) {
        return genericError.execute(err)
    }
}

export async function loginFail() {
    try {
        return userOrPasswordIncorrect.execute()
    } catch (err) {
        return genericError.execute(err)
    }
}

export async function logoutAll() {
    try {
        return {
            message: messages.logout_all_success,
            statusCode: 200
        }
    } catch (err) {
        return genericError.execute(err)
    }
}

export async function invalidToken() {
    try {
        return {
            message: messages.invalid_token,
            statusCode: 401
        }
    } catch (err) {
        return genericError.execute(err)
    }
}