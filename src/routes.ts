import express from 'express';

const routes = express.Router();
 
import CitiesController from './controllers/CitiesController';
import UfsController from './controllers/UfsController';
import StatesController from './controllers/StatesController';

routes.get('/', (req,res)=> {
    return res.status(200).json("Working");

})

routes.get('/cidades/:uf', CitiesController.index );

routes.get('/estados', UfsController.index);
routes.get('/estados/regioes/:id', UfsController.list);


routes.get('/regioes', StatesController.index );

export default routes;