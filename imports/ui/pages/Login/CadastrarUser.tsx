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

export function CadastrarUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<{ message: string | null }>({
    message: null,
  });

  const nav = useNavigate();

  const submit = (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError({ message: "As senhas não coincidem" });
      return;
    }

    Accounts.createUser(
      {
        username: username,
        password: password,
      },
      (error) => {
        if (error) {
          console.error("Erro ao criar usuário:", error);
          setError({ message: error.message });
        } else {
          console.log("Usuário criado com sucesso");
          setError({ message: null });
        }
      }
    );
  };

  return (
    <div className="login">
      <form onSubmit={submit} className="card-login">
        <LogoSynergia />
        <h1>Crie um usuário</h1>
        <StyledDivForm>
          <InputWithLabel
            label={"Usuário"}
            placeholder="Digite seu usuário"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value.replace(/\s/g, ""))}
          />
          <InputWithLabel
            placeholder={"***********"}
            label={"Senha"}
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}
          />
          <InputWithLabel
            placeholder={"***********"}
            label={"Confirme a Senha"}
            type="password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value.replace(/\s/g, ""))
            }
            required
            errorMessage={error.message}
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

          <StyleSpan onClick={() => nav("/login")}>Cancelar</StyleSpan>
        </StyledDivForm>
      </form>
    </div>
  );
}
