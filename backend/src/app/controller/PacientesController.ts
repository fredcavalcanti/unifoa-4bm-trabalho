import { getRepository } from 'typeorm';

import Pacientes from '../models/Pacientes';

interface Request {
  nome: string;
}

class PacientesController {
  public async store({ nome }: Request): Promise <Pacientes>{

    const PacientesRepository = getRepository(Pacientes);

    const user = PacientesRepository.create({ nome })

    await PacientesRepository.save(user);

    return user;

  }
}

export default PacientesController;
