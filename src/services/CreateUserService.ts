import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

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
    if (checkUserExists) throw new Error('E-mail address already used');

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
