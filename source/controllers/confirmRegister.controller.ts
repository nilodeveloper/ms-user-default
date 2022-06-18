import * as service from '../service';

export async function confirmRegister(code: string) {
    try {
        const result = await service.confirmRegister(code);
        return result;
    } catch (e) {
        return { 
            message: e,
            statusCode: 500
        }
    }
}