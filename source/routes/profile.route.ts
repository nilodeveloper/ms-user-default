import express from 'express';
import * as controller from '../controllers/getProfile.controller';
import 'dotenv/config'

export const profile = express()

profile.get('/profile', async (req, res) => {
    try{
        if(!req.headers.authorization){
            throw { message: "Token is null", statusCode: 400 }
        }
        const result = await controller.getProfile(req.headers.authorization);
        res.status(result.statusCode).json(result);
    }catch(err: any){
        res.status(err.statusCode).json({
            message:err.message,
            statusCode: err.statusCode
        });
    }
});