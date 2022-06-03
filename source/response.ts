import * as messages from './messages.json';

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
    } catch (e) {
        console.log('Error: ',e)
        return { 
            message: messages.server_error, 
            statusCode: 500
        }
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
        console.log('Error: ',err)
        return { 
            message: messages.server_error, 
            statusCode: 500
        }
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
    } catch (e) {
        console.log('Error: ',e)
        return { 
            message: messages.server_error,
            statusCode: 500
        }
    }
}

export async function loginFail() {
    try {
        return {
            message: messages.user_or_pass_incorrect,
            statusCode: 401
        }
    } catch (e) {
        console.log('Error: ',e)
        return { 
            message: messages.server_error,
            statusCode: 500
        }
    }
}

export async function logoutAll() {
    try {
        return {
            message: messages.logout_all_success,
            statusCode: 200
        }
    } catch (e) {
        console.log('Error: ',e)
        return { 
            message: messages.server_error,
            statusCode: 500
        }
    }
}

export async function invalidToken() {
    try {
        return {
            message: messages.invalid_token,
            statusCode: 401
        }
    } catch (e) {
        console.log('Error: ',e)
        return { 
            message: messages.server_error,
            statusCode: 500
        }
    }
}