import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import Eventos from './Eventos';
import Usuarios from './Usuarios';

@Entity('curtidas')
class Curtidas{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  evento_id: string;

  @ManyToOne( () => Eventos)
  @JoinColumn({ name: 'evento_id' })
  id_do_evento: Eventos;

  @Column()
  usuario_id: string;

  @ManyToOne( () => Usuarios)
  @JoinColumn({ name: 'usuario_id' })
  id_do_usuario: Usuarios;

}

export default Curtidas;
