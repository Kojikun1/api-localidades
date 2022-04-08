import express from 'express';
import cors from 'cors';
const app = express();

import routes from './routes';

app.use(express.json());

app.use(cors());

app.use('/api/v1',routes);


app.listen(5000);
