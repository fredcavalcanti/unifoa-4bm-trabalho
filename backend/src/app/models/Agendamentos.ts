import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from 'typeorm';
  
  import Pacientes from './Pacientes';
  import Medicos from './Medicos';
  
  @Entity('agendamentos')
  class Agendamentos {
  
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    paciente: string;
  
    @ManyToOne( () => Pacientes)
    @JoinColumn({ name: 'paciente' })
    paciente_agendamento: Pacientes;
  
    @Column()
    medico: string;
  
    @ManyToOne( () => Medicos)
    @JoinColumn({ name: 'medico' })
    medico_agendamento: Medicos;
  
    @Column()
    data: string;
  
    @Column()
    horario: string;
  
    @CreateDateColumn()
    create_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
  }
  
  export default Agendamentos;
  