export async function userFormated(user: any) {
    try {
        const {name, lastname, login, email} = user;
        return {
            data:{
                name,
                lastname,
                login,
                email
            },
            statusCode: 200,
            message: "Usuário resgatado com sucesso"
        };
    } catch (e) {
        return { 
            message: e,
            statusCode: 500,
        }
    }
}

export async function loginSuccess(message: any, token: string) {
    try {
        return {
            data:{
                token: token,
            },
            message: "Login feito com sucesso",
            statusCode: 200
        }
    } catch (e) {
        return { 
            message: e
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
            message: "Usuário resgatado com sucesso",
            statusCode: 200
        }
    } catch (err: any) {
        return { 
            message: err.message || "Ocorreu um erro no servidor", 
            statusCode: err.statusCode || 500
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