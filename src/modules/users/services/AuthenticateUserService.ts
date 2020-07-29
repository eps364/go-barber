import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/config';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateSessionDTO from '@modules/users/dtos/ICreateSessionDTO';
import IResponseSessionDTO from '@modules/users/dtos/IResponseSessionDTO';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

@injectable()
class AuthenticatiteUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessionDTO): Promise<IResponseSessionDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination.', 401);

    const passwordMatched = this.hashProvider.compareHash(
      password,
      user.password,
    );

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
