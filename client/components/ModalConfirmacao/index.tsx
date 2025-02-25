import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  position: relative;
  margintop: 50px;
`;

const style = {
  fontFamily: "Saira, sans-serif",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ModalConfirmacao({ open, onClose }: Props) {
  const nav = useNavigate();

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Tem certeza que deseja cancelar o cadastro?
        </Typography>

        <StyledDiv>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => nav("/tasks")}
          >
            Sim
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => onClose()}
          >
            Não
          </Button>
        </StyledDiv>
      </Box>
    </Modal>
  );
}
