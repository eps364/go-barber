import Router from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/contollers/AppointmentsController';

const appontmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appontmentsRouter.use(ensureAuthenticated);

appontmentsRouter.post('/', appointmentsController.create);

export default appontmentsRouter;
