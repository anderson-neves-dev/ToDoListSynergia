import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { TaskInterface } from "/client/interfaces/task";
import { formatHoraMinuto } from "/client/shareds";
import BasicModal from "../ModalVisualizar";
import { Box, Button } from "@mui/material";
import LongMenu from "../LongMenu";
import { useNavigate } from "react-router";

interface FolderListProps {
  tasks: TaskInterface[];
}

export default function FolderList({ tasks }: FolderListProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<TaskInterface | null>(
    null
  );

  const handleOpenModal = (task: TaskInterface) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);
  const nav = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Button
        onClick={() => {
          nav("/cadastrar-task");
        }}
        variant="contained"
        color="primary"
      >
        Criar Tarefa
      </Button>

      <List
        sx={{
          width: "80%",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          boxShadow: 5,
          padding: "20px 20px",
          marginTop: "50px",
        }}
      >
        {tasks &&
          tasks.map((task) => (
            <ListItem
              key={task.nome}
              sx={{
                width: "100%",
                padding: "20px",
                margin: "10px 0",
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                boxShadow: 1,
                "&:hover": {
                  bgcolor: "#e0e0e0",
                  cursor: "pointer",
                },
              }}
              component="li"
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "#1976d2" }}>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                onClick={() => handleOpenModal(task)}
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {task.nome}
                    </span>
                    <span style={{ fontSize: "16px", color: "#555" }}>
                      {formatHoraMinuto(new Date(task.agendadaPara))}
                    </span>
                  </Box>
                }
              />{" "}
              <LongMenu />
            </ListItem>
          ))}
      </List>

      {selectedTask && (
        <BasicModal
          tasks={selectedTask}
          open={open}
          onClose={handleCloseModal}
        />
      )}
    </Box>
  );
}
