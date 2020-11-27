import React from "react";
import { Link } from "react-router-dom";

import {
  PersonInput,
  PersonButtonEntrar,
  PersonButtonCadastrar,
  Container
} from "./styles";

const Register: React.FC = () => {
  return (
    <div>
      <Container>
        <h1> Criar Usuário </h1>
        <label><b>Nome</b></label>
        <PersonInput type="text" placeholder="João Abreu" ></PersonInput>
        <label><b>Email</b></label>
        <PersonInput type="text" placeholder="email@provedor.com" ></PersonInput>
        <label><b>Password</b></label>
        <PersonInput type="password" placeholder="******" ></PersonInput>
          <PersonButtonEntrar>Criar</PersonButtonEntrar>
        <Link to="/"> 
          <PersonButtonCadastrar>Voltar</PersonButtonCadastrar>
        </Link>
      </Container>
    </div>
  );
};

export default Register;
