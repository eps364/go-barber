import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ link: 'https://github.com/eps364/' }),
);

export default routes;
