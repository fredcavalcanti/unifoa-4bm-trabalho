import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";

import {
  PersonInput,
  PersonSelect,
  PersonButtonEntrar,
  PersonButtonCadastrar,
  Container
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

  let [buttonSave, setButtonSave] = useState("Criar");
  let [buttonBack, setButtonBack] = useState("Voltar")
  let [textoPagina, setTextoPagina] = useState("Criar Novo Agendamento")

  const [agendamentos, setAgendamentos] = useState<Iagendamentos[]>([]);
  const [pacientes, setPacientes] = useState<Ipaciente[]>([]);
  const [medicos, setMedicos] = useState<Imedico[]>([]);

  let [pacienteSelecionado, setPacienteSelecionado] = useState("");
  let [medicoSelecionado, setMedicoSelecionado] = useState("")
  let [dataSelecionada, setDataSelecionada] = useState("")
  let [horaSelecionada, sethoraSelecionada] = useState("")


  let reguleMode = (meusAgendamentos:any) => {
    let editMode = window.location.search;
    if(editMode){
      setButtonSave(buttonSave = "Salvar")
      setButtonBack(buttonBack = "Cancelar")
      let idComp = editMode.split('=')[1]
      let [agendomentoUnico] = meusAgendamentos.filter( (a:any) => a.id == idComp);
      setPacienteSelecionado(agendomentoUnico.paciente)
      setMedicoSelecionado(agendomentoUnico.medico)
      sethoraSelecionada(agendomentoUnico.horario)
      let [dia,mes,ano] = (agendomentoUnico.data).split('/')
      let dataInput = `${ano}-${mes}-${dia}`;
      setDataSelecionada(dataInput);
      setTextoPagina("Editar Agendamento")
    }
  }

  let handlerSelectPaciente = (evt:any) => setPacienteSelecionado(pacienteSelecionado = evt.target.value);
  let handlerSelectMedico = (evt:any) => setMedicoSelecionado(medicoSelecionado = evt.target.value);
  let handlerSelectData = (evt:any) => setDataSelecionada(dataSelecionada = evt.target.value);
  let handlerSelectHora = (evt:any) => sethoraSelecionada(horaSelecionada = evt.target.value);

  let getAgendamentos = async () => {
    let response = await api.get('agendamentos');
    if (response.status === 200) {
      setAgendamentos(response.data);
      reguleMode(response.data);
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
    }
  }

  let getMedicos = async () => {
    let response = await api.get(`medicos`);
    if (response.status === 200) {
      setMedicos(response.data);
    }
  }

  let handlerSubmit = (evt:any) => {
    evt.preventDefault();
    if(!pacienteSelecionado || !medicoSelecionado || !dataSelecionada || !horaSelecionada){
      alert('Por favor, preencha todos os campos');
      return false;
    }
    let editMode = window.location.search;
    let data = dataSelecionada;
    let [ ano, mes, dia] = data.split('-')
    let dataFormatada = `${dia}/${mes}/${ano}`
    if(!editMode){
      api.post('agendamentos',{
        paciente:pacienteSelecionado,
        medico:medicoSelecionado,
        data:dataFormatada,
        horario:horaSelecionada
      }).then( a => {
        alert('Cadastro feito com sucesso!');
        window.location.href = "/"
      })
      .catch(err => {
        alert('Error ao cadastrar Agendamento')
      })
    }else{
      let idComp = editMode.split('=')[1]
      api.post('agendamentos/update',{
        id:idComp,
        paciente:pacienteSelecionado,
        medico:medicoSelecionado,
        data:dataFormatada,
        horario:horaSelecionada
      }).then( a => {
        alert('Atualização feita com sucesso!');
        window.location.href = "/"
      })
      .catch(err => {
        alert('Error ao atualizar Agendamento')
      })
    }

  }

  useEffect(() => {
    getAgendamentos();
    getPacientes();
    getMedicos();
  }, [0])


  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <Container>
          <h1> {textoPagina} </h1>
          <label><b>Paciente</b></label>
          <PersonSelect onChange={handlerSelectPaciente} value={pacienteSelecionado} >
          <option value="">Selecione um paciente</option>
            {pacientes.map( (a,i) => {
              return <option key={i} value={a.id}>{a.nome}</option>
            })}
          </PersonSelect>
          <label><b>Médico</b></label>
          <PersonSelect onChange={handlerSelectMedico} value={medicoSelecionado}>
          <option value="">Selecione um médico</option>
          {medicos.map( (a,i) => {
              return <option key={i} value={a.id}>{a.nome}</option>
            })}
          </PersonSelect>
          <div hidden={medicoSelecionado != "" ? false : true}>
            <label><b>Especialidade</b></label>
            <PersonInput type="text" value={medicoUnico(medicoSelecionado,2)} disabled></PersonInput>
          </div>
          <label><b>Data</b></label>
          <PersonInput type="date" onChange={handlerSelectData} value={dataSelecionada} ></PersonInput>
          <label><b>Hora</b></label>
          <PersonInput type="time" onChange={handlerSelectHora} value={horaSelecionada} ></PersonInput>
          
          <PersonButtonEntrar>{buttonSave}</PersonButtonEntrar>
          <Link to="/"> 
            <PersonButtonCadastrar>{buttonBack}</PersonButtonCadastrar>
          </Link>
        </Container>
      </form>
    </div>
  );
};

export default Register;
