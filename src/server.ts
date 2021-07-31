import 'reflect-metadata';

import express, {Request, Response, NextFunction} from 'express';
import  'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import  AppError from './errors/AppError';

import './database';


const app = express();

app.use(express.json());// faz o entedimento do que vai no corpo de um arquivo json
app.use('/files', express.static(uploadConfig.directory));// fica acessivel publicamente no navegador
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
    if(err instanceof AppError){//se o erro foi originado da classe que eu crie que foi nstaciado em alguma hora
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333,()=>{
    console.log('🚀Servidor rodando na porta 3333');
});

//para executar ➜ yarn dev:server       