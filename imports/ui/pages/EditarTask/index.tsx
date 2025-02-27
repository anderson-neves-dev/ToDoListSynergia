import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Checkbox, Divider, FormControlLabel } from "@mui/material";
import styled from "styled-components";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { useNavigate, useParams } from "react-router";
import ModalConfirmacao from "/client/components/ModalConfirmacao";
import { TasksCollection } from "/imports/api/tasksColletion";

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

export default function EditarTask() {
  const user = useTracker(() => Meteor.user());
  const { id } = useParams();
  const nav = useNavigate();

  const isLoading = useSubscribe("tasks");

  const taskEdit = useTracker(() => {
    if (!isLoading) return null;
    return TasksCollection.findOne({ _id: id });
  }, [id]);

  console.log("Task encontrada:", taskEdit);

  const [agendadaPara, setAgendadaPara] = React.useState(() => {
    const dateTime = new Date(taskEdit.agendadaPara);

    const hours = dateTime.getUTCHours().toString().padStart(2, "0");
    const minutes = dateTime.getUTCMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;

    const date = dateTime.toISOString().split("T")[0];

    return { time, date };
  });

  console.log({ agendadaPara });
  console.log({ taskEdit });
  const [task, setTask] = React.useState({
    ...taskEdit,
    criadaEm:
      taskEdit.criadaEm instanceof Date
        ? taskEdit.criadaEm.toISOString()
        : new Date(taskEdit.criadaEm).toISOString(),

    agendadaPara:
      taskEdit.agendadaPara instanceof Date
        ? taskEdit.agendadaPara.toISOString()
        : new Date(taskEdit.agendadaPara).toISOString(),
  });
  console.log(task);
  const [open, setOpen] = React.useState(false);

  const handleCloseModal = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleEdit = async () => {
    console.log(agendadaPara.date, agendadaPara.time);

    const agendadaParaISO =
      agendadaPara.date && agendadaPara.time
        ? new Date(
            `${agendadaPara.date}T${agendadaPara.time}:00.000Z`
          ).toISOString()
        : "";

    const taskEditada = {
      ...task,
      agendadaPara: agendadaParaISO,
    };

    setTask(taskEditada);

    await Meteor.callAsync("tasks.update", taskEdit._id, task)
      .then(() => {
        nav("/tasks");
      })
      .catch((error) => console.error("Erro ao salvar tarefa:", error));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit();
      }}
    >
      <Box sx={style}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Editar Task
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
      {open && (
        <ModalConfirmacao
          open={open}
          onClose={handleCloseModal}
          titulo="Tem certeza que deseja cancelar o cadastro?"
          onClickSim={() => nav("/tasks")}
        />
      )}
    </form>
  );
}
