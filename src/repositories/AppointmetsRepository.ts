import { isEqual } from 'date-fns';
import Appointmet from '../models/Appointment';

class AppointmetsRepository {
  private appontments: Appointmet[];

  constructor() {
    this.appontments = [];
  }

  public all(): Appointmet[] | null {
    return this.appontments || null;
  }

  public findByDate(date: Date): Appointmet | null {
    const findAppointment = this.appontments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppointment || null;
  }

  public create(provider: string, date: Date): Appointmet {
    const appointment = new Appointmet(provider, date);
    this.appontments.push(appointment);
    return appointment;
  }
}

export default AppointmetsRepository;
