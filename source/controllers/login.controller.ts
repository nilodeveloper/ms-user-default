import * as service from '../services/login.service';
import {Credentials} from '../interface';

export async function login(credentials: Credentials) {
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