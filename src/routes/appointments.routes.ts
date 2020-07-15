import Router from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';
import AppointmetsRepository from '../repositories/AppointmetsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appontmentsRouter = Router();

appontmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmetsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appontmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parseDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appontmentsRouter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const appointmentsRepository = getCustomRepository(AppointmetsRepository);
    const appointments = await appointmentsRepository.delete(id);
    return response.status(204).json(appointments);
  } catch (error) {
    return response.status(400).json({ message: 'Not found deleted' });
  }
});

export default appontmentsRouter;
