import express from 'express';
import 'dotenv/config'
import routes from './source/routes/routes';

const app = express();
app.use(express.json());
app.use(routes());

app.listen(process.env.PORT, ()=>{console.log('Server is on in port '+process.env.PORT)})