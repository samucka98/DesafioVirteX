import express from 'express';
import cors from 'cors';
import HuaweiParser from './tools/HuaweiParser';
import ZteParser from './tools/ZteParser';
import sequelize from '../db/database';
import ontinfo from '../models/ontinfo';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/load-data', async (request, response) => {
  const DataHuawei = await HuaweiParser('OntInfo - Huawei');
  const DataZte = await ZteParser('OntInfo - ZTE - SNs', 'OntInfo - ZTE - SNs - State');

    sequelize.sync().then(()=> {
      console.log('Banco de dados sincronizado com sucesso!');

      DataHuawei.map(item => {
        ontinfo.create(item)
          .then(item => console.log('Novo registro de ontinfo realizado com sucesso:', item))
          .catch(error => console.error('Erro ao criar ontinfo:', error));
      });

      DataZte.map(item => {
        ontinfo.create(item as any)
          .then(item => console.log('Novo registro de ontinfo realizado com sucesso:', item))
          .catch(error => console.error('Erro ao criar ontinfo:', error));
      });

      const ammount = DataZte.length + DataHuawei.length;

      response.status(200).send({
        ammount,
        message: 'Dados registrado com sucesso'
      });

    }).catch((error) => console.error('Erro ao sincronizar o banco de dados:', error));
  }
);

app.get('/get-data', async (request, response) => {
  const ontinfos = await ontinfo.findAll();

  response.status(200).send(ontinfos);
});

app.listen(5000, () => console.log('Servidor rodando na porta: 5000'));