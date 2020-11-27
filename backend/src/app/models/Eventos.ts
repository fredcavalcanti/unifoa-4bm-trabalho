import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import Usuarios from './Usuarios';

@Entity('eventos')
class Eventos {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario_evento_id: string;

  @ManyToOne( () => Usuarios)
  @JoinColumn({ name: 'usuario_evento_id' })
  usuario_evento: Usuarios;

  @Column()
  nome_do_evento: string;

  @Column()
  local: string;

  @Column()
  foto: string;

  @Column()
  comentario: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

export default Eventos;
