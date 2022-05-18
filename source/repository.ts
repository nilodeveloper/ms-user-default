import { PrismaClient } from '@prisma/client';

export async function saveUser(user: any){
    const prisma = new PrismaClient()
    const newUser = await prisma.user.create({
        data: user
    })
    return newUser;
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