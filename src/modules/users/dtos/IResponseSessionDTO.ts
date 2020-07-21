import User from '@modules/users/infra/typeorm/entities/User';

export default interface IResponseSessionDTO {
  user: User;
  token: string;
}
