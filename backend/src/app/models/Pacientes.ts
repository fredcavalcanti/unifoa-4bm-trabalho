import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
  } from 'typeorm';
  
  @Entity('pacientes')
  class Pacientes {
  
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    nome: string;
  
    @CreateDateColumn()
    create_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
  }
  
  export default Pacientes;
  