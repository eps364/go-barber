import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ link: 'https://github.com/eps364/' }),
);
routes.use('/sessions', sessionsRouter);

// routes.use(ensureAuthenticated);
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
