export async function userFormated(user: any) {
    try {
        const {name, lastname, login} = user;
        return {
            data:{
                name,
                lastname,
                login,
            },
            statusCode: 200,
            message: "Usuário resgatado com sucesso"
        };
    } catch (e) {
        console.log('Error: ',e)
        return { 
            message: "Ocorreu um erro no servidor", 
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
            message: "Usuário resgatado com sucesso",
            statusCode: 200
        }
    } catch (err: any) {
        console.log('Error: ',err)
        return { 
            message: "Ocorreu um erro no servidor", 
            statusCode: 500
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
        console.log('Error: ',e)
        return { 
            message: "Ocorreu um erro interno no servidor",
            statusCode: 500
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
        console.log('Error: ',e)
        return { 
            message: "Ocorreu um erro interno no servidor",
            statusCode: 500
        }
    }
}