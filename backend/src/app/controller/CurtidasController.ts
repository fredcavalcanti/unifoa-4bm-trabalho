import { getRepository } from 'typeorm';
import Curtidas from '../models/Curtidas';

interface Request {
  evento_id:string;
  usuario_id:string;
}

class CurtidasController {
  public async store( { evento_id, usuario_id } : Request) : Promise<Curtidas>{
    const curtidaRepository = getRepository(Curtidas);
    const curtida = curtidaRepository.create({ evento_id, usuario_id });
    await curtidaRepository.save(curtida);
    return curtida;
  }
}

export default CurtidasController;
