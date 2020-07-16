import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ link: 'https://github.com/eps364/' }),
);
routes.use('/sessions', sessionsRouter);

routes.use(ensureAuthenticated);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
