import * as service from '../service';

export async function logoutAll(token: string) {
    try {
        const result = await service.logoutAll(token);
        return result;
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}