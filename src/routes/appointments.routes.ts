import Router, { response } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

const appontmentsRouter = Router();

const appointments: Appointment[] = [];

appontmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parseDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parseDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointme is already booked' });
  }
  const appointment = new Appointment(provider, parseDate);

  appointments.push(appointment);
  return response.json(appointment);
});

export default appontmentsRouter;
