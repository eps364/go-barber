import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });
    if (checkUserExists) throw new AppError('E-mail address already used', 401);

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    delete user.password;
    return user;
  }
}

export default CreateUserService;
