import express from 'express';
import HuaweiParser from './tools/HuaweiParser';
import ZteParser from './tools/ZteParser';

const app = express();

// Sera um post (mas para teste estarei usando um get para visualizar)
app.get('/data', async (request, response) => {
  // Ler arquivos estaticamente
  const DataHuawei = await HuaweiParser('OntInfo - Huawei');
  const DataZte = await ZteParser('OntInfo - ZTE - SNs', 'OntInfo - ZTE - SNs - State');

  response.send({
    DataHuawei,
    DataZte
  });

  // Salvar no banco de dados
});

// app.get('/data', (request, response) => {
//   // Recuperar dados do banco e enviar para o front
// });

app.listen(5000, () => console.log('Servidor rodando na porta: 5000'));