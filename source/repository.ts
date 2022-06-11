import { PrismaClient } from '@prisma/client';

export async function saveUser(user: any){
    const prisma = new PrismaClient()
    const newUser = await prisma.user.create({
        data: user
    })
    return newUser;
}

export async function getPasswordByEmail(email: any){
    const prisma = new PrismaClient()
    const confirmUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(confirmUser?.confirmation == 0){
        return {
            message: "Por favor, confirme primeiro o cadastro no seu email de registro",
            email: "",
            password: "",
            statusCode: 403
        }
    }

    if(!confirmUser){
        return {
            id: "",
            email: "",
            password: ""
        }
    }

    return confirmUser
}

export async function verifyEmail(email: any){
    const prisma = new PrismaClient()
    const confirmUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!confirmUser){
        return null
    }
    return confirmUser
}

export async function getValidTokenTime(email: any){
    const prisma = new PrismaClient()
    const confirmUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!confirmUser){
        return {
            id: "",
            email: "",
            password: ""
        }
    }
    return confirmUser.validTokenTime
}

export async function getUserByEmail(email: any){
    const prisma = new PrismaClient()
    const confirmUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!confirmUser){
        return {
            id: "",
            email: "",
        }
    }
    return confirmUser
}

export async function registerValidTokenTime(email: any){
    const prisma = new PrismaClient()
    const time = Math.floor(Date.now() / 1000);
    console.log('email', email);
    const updateUser = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            validTokenTime: time,
        },
    })
    return updateUser.validTokenTime
}

export async function checkPassword(id: any){
    const prisma = new PrismaClient()
    const confirmUser = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return confirmUser?.password
}

export async function updatePassword(id: any, newHash: any){
    const prisma = new PrismaClient()
    const updateUser = await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            password: newHash,
        },
    })
    return updateUser
}

export async function updateEmail(oldEmail:string, newEmail: string){
    const prisma = new PrismaClient()
    const updateUser = await prisma.user.update({
        where: {
            email: oldEmail,
        },
        data: {
            email: newEmail,
        },
    })
    return updateUser
}

export async function getUser(login: string){
    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({
        where: {
            login: login
        }
    })
    return user;
}

export async function confirmCode(code: string){
    const prisma = new PrismaClient()

    const updateUser = await prisma.user.update({
        where: {
            confirmationCode: code,
        },
        data: {
            confirmation: 1,
        },
    })

    if(updateUser){
        return updateUser
    }

    return {message:"Não foi possível confirmar", statusCode: 500};
}