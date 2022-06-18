import express from 'express';
import * as controller from '../controller';
import * as messages from '../messages.json';
import 'dotenv/config'

export const logoutAll = express()

logoutAll.post('/logout/all', async (req, res) => {
    try{
        const result = await controller.logoutAll(req.headers.authorization || "");
        res.status(result.statusCode || 500).json(result);
    }catch(e){
        console.log("error", e)
        res.json({
            message:"Erro interno no servidor",
            statusCode: 500
        });
    }
});