import Router from 'express';
import { parseISO } from 'date-fns';
import AppointmetsRepository from '../repositories/AppointmetsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appontmentsRouter = Router();
const appointmentsRepository = new AppointmetsRepository();

// Rotas

appontmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appontmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parseDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appontmentsRouter;
