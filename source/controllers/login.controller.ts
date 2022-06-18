import * as service from '../service';

export async function login(credentials: any) {
    try {
        const result = await service.login(credentials);
        return result;
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}