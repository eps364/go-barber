import Router from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmetsRepository from '../repositories/AppointmetsRepository';

const appontmentsRouter = Router();
const appointmentsRepository = new AppointmetsRepository();

// Rotas

appontmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appontmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parseDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(
    parseDate,
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointme is already booked' });
  }
  const appointment = appointmentsRepository.create(provider, parseDate);
  return response.json(appointment);
});

export default appontmentsRouter;
