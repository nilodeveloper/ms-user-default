import { changeEmail } from './changeEmail.route';
import { changePassword } from './changePassword.route';
import { confirmEmail } from './confirmEmail.route';
import { login } from './login.route';
import { create } from './create.route';
import { logoutAll } from './logoutAll.route';
import { profile } from './profile.route';
import { profileLogin } from './profileLogin.route';
import { helloWorld } from './helloWorld.route';
import { notFound } from './404.route';

export function routes(){
    return [
        helloWorld,
        changeEmail,
        changePassword,
        confirmEmail,
        login,
        create,
        logoutAll,
        profile,
        profileLogin,
        notFound
    ]
}

export default routes;