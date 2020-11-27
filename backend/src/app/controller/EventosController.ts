import { getRepository } from 'typeorm';
import Eventos from '../models/Eventos';

interface Request {
  usuario_evento_id:string;
  nome_do_evento:string;
  local:string;
  foto:string;
  comentario:string;
}

class EventosController {
  public async store( { usuario_evento_id, nome_do_evento, local, foto, comentario } : Request) : Promise<Eventos>{
    const eventosRepository = getRepository(Eventos);
    const evento = eventosRepository.create({ usuario_evento_id, nome_do_evento, local, foto, comentario });
    await eventosRepository.save(evento);
    return evento;
  }
}

export default EventosController;
