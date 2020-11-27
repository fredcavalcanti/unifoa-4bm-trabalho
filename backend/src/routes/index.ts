import { Router } from 'express';
import cors from 'cors';

import usuariosRouter from './Usuarios.routes';
import eventosRouter from './eventos.routes';
import sessionsRouter from './sessions.routes';
import curtidasRouter from './curtidas.routes';
import pacientesRouter from './Pacientes.routes';
import medicosRouter from './Medicos.routes';
import agendamentosRouter from './Agendamentos.routes';

const routes = Router();

const options: cors.CorsOptions = {
    origin: '*'
};

routes.use(cors(options));

routes.use('/usuarios', usuariosRouter);
routes.use('/eventos', eventosRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/curtidas', curtidasRouter);
routes.use('/pacientes', pacientesRouter);
routes.use('/medicos', medicosRouter);
routes.use('/agendamentos', agendamentosRouter);

export default routes;
