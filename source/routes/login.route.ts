import express from 'express';
import * as controller from '../controllers/login.controller';
import * as messages from '../messages.json';
import 'dotenv/config'

export const login = express()

login.post('/login', async (req, res) => {
    try{
        const result = await controller.login(req.body)
        res.status(result.statusCode || 500).json(result);
    }catch(e){
        console.log("error", e)
        res.json({
            message: messages.server_error,
            statusCode: 500
        });
    }
});