import { changeEmail } from './changeEmail.route';
import { changePassword } from './changePassword.route';
import { confirmEmail } from './confirmEmail.route';
import { login } from './login.route';
import { create } from './create.route';
import { logoutAll } from './logoutAll.route';
import { profile } from './profile.route';
import { profileLogin } from './profileLogin.route';

export function routes(){
    return [
        changeEmail,
        changePassword,
        confirmEmail,
        login,
        create,
        logoutAll,
        profile,
        profileLogin,
    ]
}

export default routes;