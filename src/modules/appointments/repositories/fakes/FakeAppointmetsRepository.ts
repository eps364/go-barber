import { uuid } from 'uuidv4';
import { isEqual, isDate } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppontmentsRepository';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointments[] = [];

  public async findByDate(date: Date): Promise<Appointments | undefined> {

    const findAppointment = this.appointments.find(appointment => 
      isEqual(appointment.date, date),
    );
    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointments> {
    const appointment = new Appointments();

    Object.assign(appointment, { id: uuid() }, date, provider_id);

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
