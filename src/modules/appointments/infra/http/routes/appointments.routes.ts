import Router from 'express';
import { parseISO } from 'date-fns';
import AppointmetsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmetsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appontmentsRouter = Router();
const appointmetsRepository = new AppointmetsRepository();

appontmentsRouter.use(ensureAuthenticated);

// appontmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmetsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appontmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmetsRepository);

  const appointment = await createAppointment.execute({
    date: parseDate,
    provider_id,
  });

  return response.json(appointment);
});

appontmentsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const appointmentsRepository = getCustomRepository(AppointmetsRepository);
  const appointments = await appointmentsRepository.delete(id);
  return response.status(204).json(appointments);
});

export default appontmentsRouter;
