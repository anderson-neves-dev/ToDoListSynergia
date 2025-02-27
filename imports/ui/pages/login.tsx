import { Button } from "@mui/material";
import React, { useState } from "react";
import { LogoSynergia } from "/client/assets/iconesSynergia/logoSynergia";
import { InputWithLabel } from "/client/components/Input/InputLabel";
import styled from "styled-components";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router";
const StyledDivForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
  gap: 15px;
`;
const StyleSpan = styled.span`
  padding: 1px;
  color: white;
  font-weight: 600;
`;

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message: string | null }>({
    message: null,
  });

  const nav = useNavigate();
  const submit = (e: any) => {
    e.preventDefault();
    setError({ message: null });

    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        console.error(error);
        setError({ message: "Dados de login incorretos" });
      } else {
        console.log("Login bem-sucedido!");
      }
    });
  };

  return (
    <div className="login">
      <form onSubmit={submit} className="card-login">
        <LogoSynergia />
        <h1>Realize o login</h1>
        <StyledDivForm>
          <InputWithLabel
            label={"Usuário"}
            placeholder="Digite seu usuário"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputWithLabel
            placeholder={"***********"}
            label={"Senha"}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error.message || ""}
            required
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              fontFamily: "Saira , sans-serif",
              fontWeight: "600",
              fontSize: "16px",
              color: "white",
              padding: "10px 0",
              borderRadius: "12px",
              marginBottom: "5px",
            }}
          >
            Entrar
          </Button>

          <StyleSpan onClick={() => nav("/cadastrar-usuario")}>
            Cadastrar
          </StyleSpan>
          <StyleSpan>Esqueci minha Senha</StyleSpan>
        </StyledDivForm>
      </form>
    </div>
  );
}
