import { Router, Response, Request } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.get(
  '/',
  (request: Request, response: Response): Response => {
    const link = process.env.REP;
    const version = process.env.VERSION;
    return response.status(200).json({
      link,
      version,
    });
  },
);
routes.use('/sessions', sessionsRouter);

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
