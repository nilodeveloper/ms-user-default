import express from 'express';
import * as controller from '../controllers/confirmRegister.controller';
import 'dotenv/config'

export const confirmEmail = express()

confirmEmail.get('/confirm/email/:code', async (req, res) => {
    try{
        const code = req.params.code;
        const result = await controller.confirmRegister(code);
        res.status(200).json(result);
    }catch(e){
        res.json({
            message:e,
            statusCode: 500
        });
    }
})