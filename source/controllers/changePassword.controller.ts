import * as service from '../service';

export async function changePassword(user: any) {
    try {
        const result = await service.changePassword(user);
        return result;
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}