import { Router } from 'express';
import { getRepository } from 'typeorm';

import AgendamentosController from '../app/controller/AgendamentosController';
import Agendamentos from '../app/models/Agendamentos';


const agendamentosRouter = Router();

agendamentosRouter.post('/', async (req,res) => {
  try{
    const { paciente, medico, data, horario } = req.body;
    const agendamentosController = new AgendamentosController();
    const agendamento = await agendamentosController.store({ paciente, medico, data, horario });
    res.json(agendamento);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
})

agendamentosRouter.post('/update', async (req,res) => {
  try{
    const { id, paciente, medico, data, horario } = req.body;
    const agendamentosController = new AgendamentosController();
    const agendamento = await agendamentosController.update({ id, paciente, medico, data, horario });
    res.json(agendamento);
  }catch(err){
    res.status(400).json({ error: err.message });
  }
})

agendamentosRouter.get('/', async (req,res) => {
    const agendamentosRepositorio = getRepository(Agendamentos);
    const agendamentos = await agendamentosRepositorio.find();
    return res.json(agendamentos);
})

agendamentosRouter.get('/:id', async (req,res) => {
    const agendamentosRepositorio = getRepository(Agendamentos);
    const { id } = req.params;
    const agendamento = await agendamentosRepositorio.findOne(id);
    return res.json(agendamento);
  })

agendamentosRouter.delete('/:id', async (req,res) => {
    const { id } = req.params;
    const agendamentosRepositorio = getRepository(Agendamentos);
    await agendamentosRepositorio.delete(id);
    return res.send();
})



export default agendamentosRouter;
