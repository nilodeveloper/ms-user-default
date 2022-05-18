import express from 'express';
import 'dotenv/config'
import { route } from './source/route';

const app = express();
app.use(express.json());
app.use(route);


app.listen(process.env.PORT, ()=>{console.log('Server is on')})