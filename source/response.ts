export async function userFormated(user: any) {
    try {
        const {name, lastname, login, email} = user;
        return {name, lastname, login, email};
    } catch (e) {
        return { 
            message: e
        }
    }
}

export async function loginSuccess(message: any, token: string) {
    try {
        return {
            message: "Login feito com sucesso",
            token: token,
            statusCode: 200
        }
    } catch (e) {
        return { 
            message: e
        }
    }
}

export async function loginFail(message: any) {
    try {
        return {
            message: "Falha de login. Usuário ou senha incorreto",
            statusCode: 401
        }
    } catch (e) {
        return { 
            message: e
        }
    }
}