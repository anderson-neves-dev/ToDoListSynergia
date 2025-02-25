import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TaskInterface } from "/client/interfaces/task";
import { Divider } from "@mui/material";
import { formatarData } from "/client/shareds";

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
  tasks: TaskInterface;
  open: boolean;
  onClose: () => void;
}

export default function BasicModal({ tasks, open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {tasks.nome}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {tasks.descricao}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6">
          <strong>Criada em:</strong> {formatarData(tasks.criadaEm)}
        </Typography>
        <Typography variant="h6">
          <strong>Agendada para:</strong> {formatarData(tasks.agendadaPara)}
        </Typography>
        <Typography variant="h6">
          <strong>Situação:</strong> {tasks.situacao}
        </Typography>
        <Typography variant="h6">
          <strong>Pessoal:</strong> {tasks.privada ? "Sim" : "Não"}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" color="text.secondary">
          <strong>Usuário:</strong>{" "}
          {tasks.usuarioNome ? tasks.usuarioNome : "Não atribuído"}
        </Typography>
      </Box>
    </Modal>
  );
}
