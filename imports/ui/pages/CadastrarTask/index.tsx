import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import styled from "styled-components";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router";
import ModalConfirmacao from "/client/components/ModalConfirmacao";

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

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  position: relative;
`;

export default function CadastrarTask() {
  const user = useTracker(() => Meteor.user());

  const [agendadaPara, setAgendadaPara] = React.useState({
    date: "",
    time: "",
  });
  const [task, setTask] = React.useState({
    nome: "",
    descricao: "",
    criadaEm: new Date().toISOString(),
    agendadaPara: new Date().toISOString(),
    situacao: "Cadastrada",
    privada: false,
    byUserId: user?._id,
    usuarioNome: user?.username,
  });
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleCloseModal = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSave = async () => {
    console.log(agendadaPara.date, agendadaPara.time);

    // Converte corretamente para ISOString
    const agendadaParaISO =
      agendadaPara.date && agendadaPara.time
        ? new Date(
            `${agendadaPara.date}T${agendadaPara.time}:00.000Z`
          ).toISOString()
        : "";

    // Criar a nova tarefa localmente
    const novaTask = {
      ...task,
      agendadaPara: agendadaParaISO,
    };

    // Atualiza o estado (sem necessidade de await)
    setTask(novaTask);

    // Chama o Meteor com a nova task
    await Meteor.callAsync("tasks.insert", novaTask)
      .then(() => {
        console.log("Tarefa salva:", novaTask);
        nav("/tasks");
      })
      .catch((error) => console.error("Erro ao salvar tarefa:", error));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}
    >
      <Box sx={style}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Criar Nova Tarefa
        </Typography>
        <TextField
          required
          fullWidth
          label="Nome"
          name="nome"
          value={task.nome}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          required
          label="Descrição"
          name="descricao"
          value={task.descricao}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />
        <StyledDiv>
          <TextField
            fullWidth
            required
            type="date"
            label="Agendada para data"
            name="date"
            value={agendadaPara.date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAgendadaPara((data) => ({
                ...data,
                date: e.target.value,
              }));
            }}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            required
            type="time"
            label="Horário"
            name="time"
            value={agendadaPara.time}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAgendadaPara((data) => ({
                ...data,
                time: e.target.value,
              }));
            }}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </StyledDiv>
        <FormControlLabel
          control={
            <Checkbox
              name="privada"
              checked={task.privada}
              onChange={handleChange}
            />
          }
          label="Privada"
        />
        <Divider sx={{ my: 3 }} />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Salvar
        </Button>
        <Button
          sx={{ marginTop: "15px" }}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={() => setOpen(true)}
        >
          Cancelar
        </Button>
      </Box>
      {open && <ModalConfirmacao open={open} onClose={handleCloseModal} />}
    </form>
  );
}
