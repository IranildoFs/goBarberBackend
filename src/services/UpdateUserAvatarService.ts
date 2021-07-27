import { getRepository } from 'typeorm';
import User from '../models/Users';
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs'; // file system do node

interface Request{
    user_id: string;
    avatarFilename?: string;
}
class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename}: Request): Promise<User>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if(!user){
            throw new Error("only authenticated users can change avatar");
        }

        if (user.avatar){
            //deletar avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath); //traz o satus do arquivo existe

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;