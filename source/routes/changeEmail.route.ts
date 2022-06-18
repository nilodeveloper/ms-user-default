import express from 'express';
import * as controller from '../controller';
import * as messages from '../messages.json';
import 'dotenv/config'

export const changeEmail = express()

changeEmail.post('/change/email', async (req, res) => {
    try{
        if(!req.headers.authorization){
            throw { message: "Token is null", statusCode: 400 }
        }
        const result = await controller.changeEmail(req.headers.authorization, req.body.email);
        res.status(result.statusCode).json(result);
    }catch(e){
        res.json({
            message:e,
            statusCode: 500
        });
    }
});