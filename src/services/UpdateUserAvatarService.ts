import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) throw new Error('Only authenticated users can change avatar');

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvalarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvalarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);

    delete user.password
    return user;
  }
}

export default UpdateUserAvatarService;
