import express from 'express';
import cors from 'cors';
const app = express();

import routes from './routes';

app.use(cors());

app.use('/api/v1',routes);


app.listen(5000);
