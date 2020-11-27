import { Router } from 'express';
import { getRepository } from 'typeorm';


import UsuariosController from '../app/controller/UsuariosController';
import Usuarios from '../app/models/Usuarios';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usuariosRouter = Router();
//usuariosRouter.use(ensureAuthenticated);

usuariosRouter.post('/', async (req,res) => {
  try{
    const { nome, email, password } = req.body;

    const usuariosController = new UsuariosController();

    const user = await usuariosController.store({nome,email,password});

    let { id, nome:userName, email:userMail, created_at, updated_at } = user;

    return res.json({ id, nome:userName, email:userMail, created_at, updated_at });

  }catch(err){
    return res.status(400).json({ error: err.message });
  }
})

usuariosRouter.get('/', ensureAuthenticated, async (req,res) => {
  const usuariosRepositorio = getRepository(Usuarios);
  const user = await usuariosRepositorio.find();
  let users = await user.map(usuario => {
    let { id, nome:userName, email:userMail, created_at, updated_at } = usuario;
    return { id, nome:userName, email:userMail, created_at, updated_at };
  });
  console.log(req.body.idGenerated)
  return res.json(users);
})

usuariosRouter.get('/:id', ensureAuthenticated, async (req,res) => {
  const usuariosRepositorio = getRepository(Usuarios);
  const { id } = req.params;
  const user = await usuariosRepositorio.findOne(id);
  return res.json({id:user?.id, nome:user?.nome, email:user?.email, created_at:user?.created_at, updated_at:user?.updated_at });
})

usuariosRouter.delete('/:id', async (req,res) => {
  const usuariosRepositorio = getRepository(Usuarios);
  const { id } = req.params;
  await usuariosRepositorio.delete(id);
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

export default usuariosRouter;
