import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());// faz o entedimento do que vai no corpo de um arquivo json
app.use('/files', express.static(uploadConfig.directory));// fica acessivel publicamente no navegador
app.use(routes);

app.listen(3333,()=>{
    console.log('🚀Servidor rodando na porta 3333');
});

//para executar ➜ yarn dev:server       