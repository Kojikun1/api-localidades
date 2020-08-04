import axios from "axios";
import fs from 'fs';
import path from 'path';

async function downloadUfs(){
    const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

    console.log(response);

    const { data } = response;

    const dataToSave = JSON.stringify(data);

   fs.writeFile(path.resolve(__dirname,'data','estados.json'),dataToSave, (err)=> {
       if(err) throw err;
       console.log("the file has been saved");
   });
}
//downloadUfs();
interface Uf {
    id: number,
    sigla: string,
    nome: string
}
async function downloadCities(){
    const data = fs.readFileSync(path.resolve(__dirname,'data','estados.json'),'utf8');

    const ufsFile: Uf[] = JSON.parse(data);

     ufsFile.map(uf => { 
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.sigla}/municipios`)
            .then(response => {
                //console.log(response.data);
                
               const { data } = response;

                const dataToSave = JSON.stringify(data);
                
                fs.writeFile(path.resolve(__dirname,'data','cities',`${uf.sigla}-cidades.json`),dataToSave, (err)=> {
                    if(err) throw err;
                    console.log("Download completo", uf.sigla, "Cidades");
                }); 
            })
    })
}

//downloadCities();

async function downloadregions(){
 
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/regioes`)
            .then(response => {
                //console.log(response.data);
                
               const { data } = response;

                const dataToSave = JSON.stringify(data);
                
                fs.writeFile(path.resolve(__dirname,'data', 'regioes.json'),dataToSave, (err)=> {
                    if(err) throw err;
                    console.log("Download completo", "Regioes");
                }); 
            })
}
downloadregions();








