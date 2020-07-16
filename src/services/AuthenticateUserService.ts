import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/config';
import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticatiteUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) throw new AppError('Incorrect email/password combination.', 401);

    const passwordMatched = compare(password, user.password);

    if (!passwordMatched)
      throw new AppError('Incorrect email/password combination.', 401);
    delete user.password;

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
export default AuthenticatiteUserService;
