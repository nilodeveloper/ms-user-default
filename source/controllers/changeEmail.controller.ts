import * as service from '../service';

export async function changeEmail(token: string, newEmail: string) {
    try {
        const result = await service.changeEmail(token, newEmail);
        return result;
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}