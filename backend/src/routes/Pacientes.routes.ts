import { Router } from 'express';
import { getRepository } from 'typeorm';


//import UsuariosController from '../app/controller/UsuariosController';
//import Usuarios from '../app/models/Usuarios';
//import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import PacientesController from '../app/controller/PacientesController';
import Pacientes from '../app/models/Pacientes';

const pacientesRouter = Router();
//usuariosRouter.use(ensureAuthenticated);

pacientesRouter.post('/', async (req,res) => {
  try{
    const { nome  } = req.body;

    const pacientesController = new PacientesController();

    const paciente = await pacientesController.store({ nome });

    return res.json(paciente)

    //let { id, nome:userName, email:userMail, created_at, updated_at } = user;

    //return res.json({ id, nome:userName, email:userMail, created_at, updated_at });

  }catch(err){
    return res.status(400).json({ error: err.message });
  }
})

pacientesRouter.get('/', async (req,res) => {
  const pacientesRepositorio = getRepository(Pacientes);
  const pacientes = await pacientesRepositorio.find();
  return res.json(pacientes);
})

pacientesRouter.get('/:id', async (req,res) => {
  const pacientesRepositorio = getRepository(Pacientes);
  const { id } = req.params;
  const paciente = await pacientesRepositorio.findOne(id);
  return res.json(paciente);
})

pacientesRouter.delete('/:id', async (req,res) => {
  const pacientesRepositorio = getRepository(Pacientes);
  const { id } = req.params;
  await pacientesRepositorio.delete(id);
  return res.send();
})

// usuariosRouter.patch('/imagem', ensureAuthenticated , upload.single('foto') , async (req,res) => {
//   try{
//     console.log(req.file);
//     return res.json({  ok: true });
//   }catch(err){
//     console.log(err);
//   }
// })

export default pacientesRouter;
