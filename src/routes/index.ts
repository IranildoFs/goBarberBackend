import { Router } from 'express';

import usersRouter from './users_routes';
import sessionsRouter from './sessions_routes';
import appointmentsRouter from './appointments_routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/appointments', appointmentsRouter);


export default routes;