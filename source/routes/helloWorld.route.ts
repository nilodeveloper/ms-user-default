import express from 'express';
import 'dotenv/config'

export const helloWorld = express()

helloWorld.get('/', (req, res) => {
    res.json({
        server: `Hello World!`
    });
});