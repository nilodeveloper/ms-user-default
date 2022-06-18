import express from 'express';
import * as controller from '../controller';
import * as messages from '../messages.json';
import 'dotenv/config'

export const create = express()

create.post('/create', async (req, res) => {
    try{
        const result = await controller.createUser(req.body);
        console.log("result", result)
        res.json(result);
    }catch(e){
        res.json({
            message:e,
            statusCode: 500
        });
    }
});