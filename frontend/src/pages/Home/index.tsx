import React from "react";
import { Link } from "react-router-dom";

import {
  PersonInput,
  PersonButtonEntrar,
  PersonButtonCadastrar,
  Container
} from "./styles";

const Home: React.FC = () => {
  return (
    <div>
      <Container>
        <h1> Login </h1>
        <label><b>Email</b></label>
        <PersonInput type="text" placeholder="email@provedor.com" ></PersonInput>
        <label><b>Password</b></label>
        <PersonInput type="password" placeholder="******" ></PersonInput>
        <Link to="/events"> 
          <PersonButtonEntrar>Entrar</PersonButtonEntrar>
        </Link>
        <Link to="/register"> 
          <PersonButtonCadastrar>Cadastrar</PersonButtonCadastrar>
        </Link>
      </Container>
    </div>
  );
};

export default Home;
