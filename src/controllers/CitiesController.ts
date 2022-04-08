import { Request, Response} from 'express';
import fs from 'fs';
import path from 'path';

class CitiesController {
     index(req: Request ,res: Response){
          const { uf } = req.params;
         
         try{

          const data =  fs.readFileSync(path.resolve(__dirname,'..','data','cities',`${uf.toUpperCase()}-cidades.json`),'utf-8');

          const dataParsed = JSON.parse(data);

          return res.status(200).json(dataParsed);

         }catch(error){
              console.log(error);

              return res.status(400).json({message: "Failure to load Data"});
         }
     }
     search(req: Request, res: Response){
          const { city } = req.body;

          try {
          const dirFiles = fs.readdirSync(path.resolve(__dirname,'..','data','cities'));

          const allCities = [];

          dirFiles.map(item => {
               const data =  fs.readFileSync(path.resolve(__dirname,'..','data','cities',item),'utf-8');

               allCities.push(...data);
          })
          const filteredData = allCities.filter(item => item.name.includes(city));

          return res.status(200).json(filteredData);
          } catch (error) {
               console.log(error);

              return res.status(400).json({message: "Failure to load Data"});
          }
     }
}

export default new CitiesController();