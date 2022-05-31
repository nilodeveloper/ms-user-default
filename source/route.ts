import express from 'express';
import * as controller from './controller';

export const route = express()

route.get('/', (req, res) => {
    res.json({
        server: "is on"
    });
});

route.post('/create', async (req, res) => {
    try{
        const result = await controller.createUser(req.body);
        res.json(result);
    }catch(e){
        res.json({
            message:e
        });
    }
});

route.get('/user/:id', async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const result = await controller.getUser(id);
        res.json(result);
    }catch(e){
        res.json({
            message:e
        });
    }
});
