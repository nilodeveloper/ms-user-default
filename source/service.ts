import * as repository from './repository';
import * as response from  './response';

export async function saveUser(user: any) {
    try {
        const newUser = await repository.saveUser(user);
        return response.userFormated(newUser);
    } catch (e) {
        return { 
            message: e
        }
    }
}