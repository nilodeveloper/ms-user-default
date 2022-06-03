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
    if(!confirmUser){
        return {
            id: "",
            email: "",
            password: ""
        }
    }
    return confirmUser
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

export async function getUser(id: number){
    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return user;
}