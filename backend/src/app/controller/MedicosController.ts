import { getRepository } from 'typeorm';

import Medicos from '../models/Medicos';

interface Request {
  nome: string;
  especialidade: string;
}

class medicosController {
  public async store({ nome, especialidade }: Request): Promise <Medicos>{

    const medicosRepository = getRepository(Medicos);

    const user = medicosRepository.create({ nome, especialidade })

    await medicosRepository.save(user);

    return user;

  }

}

export default medicosController;
