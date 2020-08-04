import { Request, Response} from 'express';
import fs from 'fs';
import path from 'path';
interface Regiao {
     id: number,
     sigla: string,
     nome: string
}
interface Uf {
     id: number,
     sigla: string,
     nome: string
     regiao: Regiao
 }
class UfsController {
     
     index(req: Request ,res: Response){      
         try{

          const data =  fs.readFileSync(path.resolve(__dirname,'..','data','estados.json'),'utf-8');

          const dataParsed = JSON.parse(data);

          return res.status(200).json(dataParsed);

         }catch(error){
              console.log(error);

              return res.status(400).json({message: "Failure to load Data"});
         }
     }
     list(req: Request ,res: Response){
         
       const { id } = req.params;

          try{
               const data =  fs.readFileSync(path.resolve(__dirname,'..','data','estados.json'),'utf-8');

               const dataParsed: Uf[] = JSON.parse(data);

               const filteredData = dataParsed.filter(item => item.regiao.id === Number(id));
     
               return res.status(200).json(filteredData);

          }catch(error){
               console.log(error);

               return res.status(400).json({message: "Failure to load Data"});
          }
     }
}

export default new UfsController();