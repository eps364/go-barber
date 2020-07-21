import ICreateSessionDTO from '@modules/users/dtos/ICreateSessionDTO';
import IResponseSessionDTO from '@modules/users/dtos/IResponseSessionDTO';

export default interface ISessionRepository {
  create(data: ICreateSessionDTO): Promise<IResponseSessionDTO>;
}
