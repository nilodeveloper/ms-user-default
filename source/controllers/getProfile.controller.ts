import * as service from '../service';

export async function getProfile(token: string) {
    try {
        const profile = await service.getProfile(token);
        return profile;
    } catch (err: any) {
        return { 
            message: err.message || "Erro interno no servidor",
            statusCode: err.statusCode || 500
        }
    }
}
