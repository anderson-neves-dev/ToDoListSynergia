import { FormLabel, Input } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const StyleSpanError = styled.span`
  padding: 1px;
  color: red;
  font-weight: 300;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  position: relative;
`;

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  z-index: 10;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
`;
interface InputWithLabelProps {
  label: string;
  placeholder?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  errorMessage?: string;
}

export function InputWithLabel({
  label,
  placeholder,
  type,
  onChange,
  required,
  errorMessage,
}: InputWithLabelProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const handleTogglePassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <StyledDiv>
      <FormLabel
        sx={{
          fontFamily: "Saira, sans-serif",
          fontWeight: "600",
          fontSize: "20px",
          color: "white",
          textAlign: "left",
        }}
      >
        {label}
      </FormLabel>
      <StyledInputWrapper>
        <Input
          required={required}
          onChange={onChange}
          type={inputType}
          placeholder={placeholder}
          disableUnderline
          sx={{
            backgroundColor: "white",
            padding: "10px 15px",
            borderRadius: "12px",
            cursor: "pointer",
            fontSize: "20px",
            border: errorMessage ? "2px solid red" : "0px", // 🔴 Adiciona borda vermelha quando há erro
            width: "100%",
            color: "#35353E",
            "&:hover": {
              backgroundColor: "#FFFF",
              border: errorMessage ? "2px solid red" : "0px",
            },
          }}
        />
        {type === "password" && (
          <TogglePasswordButton type="button" onClick={handleTogglePassword}>
            {isPasswordVisible ? (
              <VisibilityIcon sx={{ color: "#35353E" }} />
            ) : (
              <VisibilityOffIcon sx={{ color: "#35353E" }} />
            )}
          </TogglePasswordButton>
        )}
      </StyledInputWrapper>
      {errorMessage && <StyleSpanError>{errorMessage}</StyleSpanError>}
    </StyledDiv>
  );
}
