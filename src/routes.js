import { Router } from 'express';
import { PeopleController, SessionController } from './app/controllers';
import authMiddleware from './app/middlewares/auth'

const routes = new Router();

routes.post('/people', PeopleController.post);
routes.post('/session', SessionController.post);

routes.use(authMiddleware)

routes.put('/people', PeopleController.put)
routes.delete('/people', PeopleController.delete)

export default routes;
