import { Button } from "@mui/material";
import React, { useState } from "react";
import { LogoSynergia } from "/client/assets/iconesSynergia/logoSynergia";
import { InputWithLabel } from "/client/components/Input/InputLabel";
import styled from "styled-components";
import { Meteor } from "meteor/meteor";
const StyledDivForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 0;
  gap: 15px;
`;
export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: any) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        if (error instanceof Meteor.Error) {
          console.error("Erro ao fazer login:", error.reason);
        } else {
          console.error("Erro ao fazer login:", error.message);
        }
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
            }}
          >
            Entrar
          </Button>
        </StyledDivForm>
      </form>
    </div>
  );
}
