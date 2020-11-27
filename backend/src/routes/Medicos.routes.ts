import { Router } from 'express';
import { getRepository } from 'typeorm';


//import UsuariosController from '../app/controller/UsuariosController';
//import Usuarios from '../app/models/Usuarios';
//import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import MedicosController from '../app/controller/MedicosController';
import Medicos from '../app/models/Medicos';

const medicosRouter = Router();
//usuariosRouter.use(ensureAuthenticated);

medicosRouter.post('/', async (req,res) => {
  try{
    const { nome, especialidade } = req.body;

    const medicosController = new MedicosController();

    const paciente = await medicosController.store({ nome, especialidade });

    return res.json(paciente)

    //let { id, nome:userName, email:userMail, created_at, updated_at } = user;

    //return res.json({ id, nome:userName, email:userMail, created_at, updated_at });

  }catch(err){
    return res.status(400).json({ error: err.message });
  }
})

medicosRouter.get('/', async (req,res) => {
  const medicosRepositorio = getRepository(Medicos);
  const medicos = await medicosRepositorio.find();
  return res.json(medicos);
})

medicosRouter.get('/:id', async (req,res) => {
  const medicosRepositorio = getRepository(Medicos);
  const { id } = req.params;
  const paciente = await medicosRepositorio.findOne(id);
  return res.json(paciente);
})

medicosRouter.delete('/:id', async (req,res) => {
  const medicosRepositorio = getRepository(Medicos);
  const { id } = req.params;
  await medicosRepositorio.delete(id);
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

export default medicosRouter;
