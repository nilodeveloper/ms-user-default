import express from 'express';
import * as controller from '../controllers/getUser.controller';
import * as routes from '../constants/routes.json';
import 'dotenv/config'

export const profileLogin = express()

profileLogin.get(routes.profile.getProfileByLogin, async (req, res) => {
    try{
        const login = req.params.login;
        const result = await controller.getUser(login);
        res.status(result.statusCode).json(result);
    }catch(e){
        res.json({
            message:e,
            statusCode: 500
        });
    }
});