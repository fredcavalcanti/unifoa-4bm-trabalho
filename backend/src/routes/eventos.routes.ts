import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import EventosController from '../app/controller/EventosController';
import Eventos from '../app/models/Eventos';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);

const eventosRouter = Router();

eventosRouter.patch('/', ensureAuthenticated , upload.single('foto') , async (req,res) => {
  try{
    const userId = req.trailers.idGenerated as string;
    const nomeArquivo = req.file.filename
    const { usuario_evento_id, nome_do_evento, local, foto, comentario } = req.body;
    const eventosController = new EventosController();
    const evento = await eventosController.store({
      usuario_evento_id:userId,
      nome_do_evento,
      local,
      foto:nomeArquivo,
      comentario
    });
    res.json(evento);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
})

eventosRouter.get('/', ensureAuthenticated, async (req,res) => {
  const eventosRepositorio = getRepository(Eventos);
  const eventos = await eventosRepositorio.find();
  return res.json(eventos);
})

eventosRouter.delete('/:id', ensureAuthenticated, async (req,res) => {
  const { id } = req.params;
  const userId = req.trailers.idGenerated as string;
  const eventosRepositorio = getRepository(Eventos);
  const evento = await eventosRepositorio.findOne({ where: { id }});
  if(evento){
    if(evento.usuario_evento_id == userId){
      await eventosRepositorio.delete(id);
      return res.send();
    }else{
      return res.json({error:'Você não criou esse evento'});
    }
  }else{
    return res.json({error:'Você não criou esse evento ou ele não existe mais'});
  }
})



export default eventosRouter;
