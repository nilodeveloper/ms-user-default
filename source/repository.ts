import { PrismaClient } from '@prisma/client';

export async function saveUser(user: any){
    const prisma = new PrismaClient()
    const newUser = await prisma.user.create({
        data: user
    })
    return newUser;
}