import express from 'express';
import * as controller from '../controllers/changePassword.controller';
import * as messages from '../messages.json';
import 'dotenv/config'

export const changePassword = express()

changePassword.post('/change/password', async (req, res) => {
    try{
        const result = await controller.changePassword(req.body);
        res.status(result.statusCode).json(result);
    }catch(e){
        res.json({
            message:e,
            statusCode: 500
        });
    }
});