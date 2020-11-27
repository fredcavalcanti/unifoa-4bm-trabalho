import { getRepository } from 'typeorm';
import Agendamentos from '../models/Agendamentos';

interface Request {
  paciente:string;
  medico:string;
  data:string;
  horario:string;
}

interface IRequest {
  id:string;
  paciente:string;
  medico:string;
  data:string;
  horario:string;
}

class AgendamentosController {
  public async store( { paciente, medico, data, horario } : Request) : Promise<Agendamentos>{
    const agendamentosRepository = getRepository(Agendamentos);
    const agendamento = agendamentosRepository.create({ paciente, medico, data, horario });
    await agendamentosRepository.save(agendamento);
    return agendamento;
  }

  public async update( { id, paciente, medico, data, horario } : IRequest) : Promise<any>{
    const agendamentosRepository = getRepository(Agendamentos);
    const agendamento = agendamentosRepository.update(id,{ paciente, medico, data, horario });
    return agendamento;
  }

}

export default AgendamentosController;
