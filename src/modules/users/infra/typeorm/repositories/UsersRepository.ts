import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  public save(user: User): Promise<User | undefined> {
    return this.ormRepository.save(user);
  }

  public findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }
}

export default UsersRepository;
