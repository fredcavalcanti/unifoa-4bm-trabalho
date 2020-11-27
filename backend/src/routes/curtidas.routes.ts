import { Router } from 'express';
import { getRepository } from 'typeorm';

import CurtidasController from '../app/controller/CurtidasController';
import Curtidas from '../app/models/Curtidas';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const curtidasRouter = Router();

curtidasRouter.post('/', ensureAuthenticated, async (req,res) => {
  try{

    const userId = req.trailers.idGenerated as string;
    const { evento_id } = req.body;

    const curtidasRepositorio = getRepository(Curtidas);
    const curtida = await curtidasRepositorio.findOne({ where: { usuario_id:userId }});

    if(!curtida){
      const curtidasController = new CurtidasController();

      const curtida = await curtidasController.store({evento_id, usuario_id:userId});

      return res.json(curtida);
    }

    return res.json({error:"Você já curtiu esse evento"});

  }catch(err){
    return res.status(400).json({ error: err.message });
  }
})

curtidasRouter.get('/:id', ensureAuthenticated, async (req,res) => {
  const userId = req.trailers.idGenerated as string;
  const curtidasRepositorio = getRepository(Curtidas);
  const curtidas = await curtidasRepositorio.find({ where: { usuario_id:userId }});
  return res.json(curtidas);
})

curtidasRouter.get('/count/:id', ensureAuthenticated, async (req,res) => {
  const userId = req.trailers.idGenerated as string;
  const curtidasRepositorio = getRepository(Curtidas);
  const curtidas = await curtidasRepositorio.find({ where: { usuario_id:userId }});
  return res.json({total:curtidas.length});
})

curtidasRouter.delete('/:eventId', ensureAuthenticated, async (req,res) => {
  const userId = req.trailers.idGenerated as string;
  const curtidasRepositorio = getRepository(Curtidas);
  const curtida = await curtidasRepositorio.findOne({ where: { usuario_id:userId }});
  if(!curtida){
    return res.json({error: 'Você não curtiu esse evento'});
  }

  await curtidasRepositorio.delete(curtida.id);
  return res.send();
})



export default curtidasRouter;
