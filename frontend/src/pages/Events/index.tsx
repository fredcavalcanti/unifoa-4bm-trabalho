import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import {
  PersonButtonCurtir,
  PersonButtonDescurtir,
  PersonButtonNovoEvento,
  Container,
  CardExterno,
  ContainerCard,
} from "./styles";

interface Iagendamentos {
  id: string;
  medico: string;
  paciente: string;
  data: string;
  horario: string;
  create_at: string;
  updated_at: string;
}

interface Ipaciente {
  id: string;
  nome: string;
  create_at: string;
  updated_at: string;
}

interface Imedico {
  id: string;
  nome: string;
  especialidade: string;
  create_at: string;
  updated_at: string;
}

const Register: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<Iagendamentos[]>([]);
  const [pacientes, setPacientes] = useState<Ipaciente[]>([]);
  const [medicos, setMedicos] = useState<Imedico[]>([]);

  let getAgendamentos = async () => {
    let response = await api.get('agendamentos');
    if (response.status === 200) {
      setAgendamentos(response.data);
      console.log(response.data)
    }
  }

  let pacienteUnico = (idPaciente:string) => {
    let [paciente] = pacientes.filter(a => a.id == idPaciente);
    if(!paciente){
      return "";
    }
    return paciente.nome;
  }

  let medicoUnico = (idMedico:string, type:number) => {
    let [medico] = medicos.filter(a => a.id == idMedico);
    if(!medico){
      return "";
    }
    return type === 1 ? medico.nome : medico.especialidade;
  }

  let getPacientes = async () => {
    let response = await api.get(`pacientes`);
    if (response.status === 200) {
      setPacientes(response.data);
      console.log(response.data)
    }
  }

  let getMedicos = async () => {
    let response = await api.get(`medicos`);
    if (response.status === 200) {
      setMedicos(response.data);
      console.log(response.data)
    }
  }

  let handleDelete = async (evt:any) => {
    let idDelete = (evt.target).getAttribute('id');
    confirmAlert({
      title: 'Deseja deletar esse agendamento?',
      message: 'Esse processo é um irreversível.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            await api.delete(`agendamentos/${idDelete}`)
            alert('Deletado com sucesso');
            getAgendamentos();
          }
        },
        {
          label: 'Não',
          onClick: () => false
        }
      ]
    })
  }

  let moveToEdit = (evt:any) => {
    let idEdit = (evt.target).getAttribute('id');
    window.location.href = `/create?id=${idEdit}`;
  }

  useEffect(() => {
    getAgendamentos();
    getPacientes();
    getMedicos();
  }, [0])

  return (
    <div>
      <Container>
        <h1> Agendamentos </h1>
        <Link to="/create">
          <PersonButtonNovoEvento>Criar Novo Agendamento</PersonButtonNovoEvento>
        </Link>
      </Container>
      {agendamentos.map( (ag,i) => {  
      return<Container key={i}>
        <CardExterno>
          <ContainerCard>
            <p>Paciente: {pacienteUnico(ag.paciente)}</p>
            <p>Medico: {medicoUnico(ag.medico,1)}</p>
            <p>Especialidade: {medicoUnico(ag.medico,2)}</p>
            <p>Data: {ag.data}</p>
            <p>Horário: {ag.horario}</p>
            <Link to={`/create?id=${ag.id}`}>
              <PersonButtonCurtir>Editar</PersonButtonCurtir>
              </Link>
            <PersonButtonDescurtir onClick={handleDelete} id={ag.id} >Deletar</PersonButtonDescurtir>
          </ContainerCard>
        </CardExterno>
      </Container>
      })}
    </div>
  );
};

export default Register;
