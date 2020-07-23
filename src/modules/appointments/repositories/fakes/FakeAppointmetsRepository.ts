import { uuid } from 'uuidv4';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppontmentsRepository';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmetsRepository implements IAppointmentsRepository {
  private appoitments: Appointments[] = [];

  public async findByDate(date: Date): Promise<Appointments | undefined> {
    const findAppointment = this.appoitments.find(
      appoitment => appoitment.date === date,
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointments> {
    const appointment = new Appointments();

    Object.assign(appointment, { id: uuid() }, date, provider_id);

    this.appoitments.push(appointment);

    return appointment;
  }
}

export default AppointmetsRepository;
