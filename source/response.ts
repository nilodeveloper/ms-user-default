export async function userFormated(user: any) {
    try {
        const {name, lastname, login, email} = user;
        return {name, lastname, login, email};
    } catch (e) {
        return { 
            message: e
        }
    }
}