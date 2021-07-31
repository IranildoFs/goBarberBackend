import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUsersService';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
interface User{
    name: string;
    email: string;
    password?: string;
}


const upload = multer(uploadConfig); //eh uma instancia do multer

usersRouter.post('/', async(req, res)=>{  
 
    const { name, email, password} = req.body;

    const createUser = new CreateUserService();

    const user:User = await createUser.execute({
        name, email, password,
    })

    delete user.password; // nao eh bom retorna e mostrar a senha, mesmo q seja em hash

    return res.json(user);
    
    
})

//cria uma rota usersROUTER, ATUALIZAR UMA UNICA INFORMACOA DO USUSÁRIO, E NAO USA PUT
usersRouter.patch('/avatar', ensureAuthenticate, upload.single('avatar'), async(request, response)=>{

    const updateUserAvatar = new UpdateUserAvatarService();
    const user:User = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file?.filename,
    });
    delete user.password;
    return response.json(user);
});

export default usersRouter;