import * as service from '../service';

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