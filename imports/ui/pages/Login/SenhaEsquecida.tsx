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
  cursor: pointer;
`;

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const nav = useNavigate();

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();

    Accounts.forgotPassword({ email }, (err) => {
      if (err) {
        setMessage({
          type: "error",
          text: "Erro ao enviar e-mail. Verifique o e-mail digitado.",
        });
      } else {
        setMessage({
          type: "success",
          text: "E-mail de recuperação enviado com sucesso!",
        });
      }
    });
  };

  return (
    <div className="login">
      <form onSubmit={handleForgotPassword} className="card-login">
        <LogoSynergia />
        <h1>Recuperar Senha</h1>
        <StyledDivForm>
          <InputWithLabel
            label={"E-mail"}
            placeholder="Digite seu e-mail"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {message && (
            <span
              style={{
                color: message.type === "error" ? "red" : "green",
                fontSize: "14px",
              }}
            >
              {message.text}
            </span>
          )}

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
            Enviar e-mail
          </Button>

          <StyleSpan onClick={() => nav("/login")}>Cancelar</StyleSpan>
        </StyledDivForm>
      </form>
    </div>
  );
}
