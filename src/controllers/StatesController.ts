import { Request, Response} from 'express';
import fs from 'fs';
import path from 'path';

class StatesController {
     index(req: Request ,res: Response){      
         try{

          const data =  fs.readFileSync(path.resolve(__dirname,'..','data','regioes.json'),'utf-8');

          const dataParsed = JSON.parse(data);

          return res.status(200).json(dataParsed);

         }catch(error){
              console.log(error);

              return res.status(400).json({message: "Failure to load Data"});
         }
     }
}

export default new StatesController();