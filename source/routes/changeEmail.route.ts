import express from 'express';
import * as controller from '../controllers/changeEmail.controller';
import * as messages from '../constants/messages.json';
import * as routes from '../constants/routes.json';
import 'dotenv/config';

export const changeEmail = express()

changeEmail.post(routes.email.change, async (req, res) => {
    try{
        if(!req.headers.authorization){
            res.status(400).json({ message: messages.token.is_null, statusCode: 400 })
        }else{
            const result = await controller.changeEmail(req.headers.authorization, req.body.email);
            res.status(result.statusCode).json(result);
        }
    }catch(e){
        res.json({
            message:e,
            statusCode: 500
        });
    }
});