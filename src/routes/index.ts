import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ link: 'https://github.com/eps364/' }),
);

routes.use('/appointments', appointmentsRouter);

export default routes;
