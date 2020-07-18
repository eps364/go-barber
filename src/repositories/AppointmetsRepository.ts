import { EntityRepository, Repository } from 'typeorm';
import Appointmet from '../models/Appointment';

@EntityRepository(Appointmet)
class AppointmetsRepository extends Repository<Appointmet> {
  public async findByDate(date: Date): Promise<Appointmet | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment || null;
  }
}

export default AppointmetsRepository;
