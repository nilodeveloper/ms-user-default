import express from 'express';
import 'dotenv/config'
import * as controller from './source/controller';

const app = express()
app.use(express.json())


app.get('/', (req, res) => {
    res.json({server: "is on"});
});

app.post('/create', async (req, res) => {
    try{
        const result = await controller.createUser(req.body);
        res.json(result);
    }catch(e){
        res.json({message:e});
    }
});

app.listen(process.env.PORT, ()=>{console.log('Server is on')})