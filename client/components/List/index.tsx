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
import { Box, Button, Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  TasksPaginationProvider,
  useTasksPagination,
} from "/imports/ui/pages/Paggination/TasksPaginationContext";
import ModalConfirmacao from "../ModalConfirmacao";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const StyledDivList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
interface FolderListProps {
  tasks: TaskInterface[];
}

function App() {
  const [open, setOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<TaskInterface | null>(
    null
  );
  const [modalDelete, setModalDelete] = React.useState({
    open: false,
    id: "",
  });

  const handleCloseModalDelete = () => {
    setModalDelete({ open: false, id: "" });
  };
  const handleOpenModalDelete = (id) => {
    setModalDelete({ open: true, id });
  };

  const {
    tasks,
    page,
    pageSize,
    totalCount,
    loading,
    setPage,
    deletarTask,
    user,
  } = useTasksPagination();
  const handleOpenModal = (task: TaskInterface) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleCloseModal = () => setOpen(false);
  const nav = useNavigate();

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <List
        sx={{
          width: "80%",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 2,
          boxShadow: 5,
          padding: "20px 20px",
          marginTop: "50px",
          height: "65vh",
        }}
      >
        <StyledDivList>
          <Button
            onClick={() => {
              nav("/cadastrar-task");
            }}
            variant="contained"
            color="primary"
            sx={{
              fontWeight: "600",
              textTransform: "none",
              marginBottom: "20px",
              fontSize: "16px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px",
              width: "80%",
            }}
          >
            <AddCircleOutlineIcon sx={{ marginRight: "10px" }} />
            <span>Adicionar Tarefa</span>
          </Button>

          {tasks &&
            tasks.map((task: TaskInterface) => (
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
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyItems: "center",
                  }}
                  onClick={() => handleOpenModal(task)}
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyItems: "center",
                      }}
                    >
                      {/* <span
                        style={{
                          fontSize: "16px",
                          color: "#555",
                          marginRight: "10px",
                        }}
                      >
                        {formatHoraMinuto(new Date(task.agendadaPara))}
                        {" -  "}
                      </span> */}
                      <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                        {task.nome}
                      </span>
                    </Box>
                  }
                  secondary={
                    <span style={{ fontSize: "16px", color: "#555" }}>
                      {task.usuarioNome}{" "}
                    </span>
                  }
                />{" "}
                {task.byUserId == user ? (
                  <StyledDiv>
                    <DriveFileRenameOutlineIcon
                      onClick={() => nav(`/editar-task/${task._id}`)}
                      sx={{
                        fontSize: "30px",
                        color: "#454545",
                      }}
                    />
                    <DeleteOutlineIcon
                      onClick={() => handleOpenModalDelete(task._id)}
                      sx={{
                        fontSize: "30px",
                        color: "#454545",
                      }}
                    />
                  </StyledDiv>
                ) : (
                  <div></div>
                )}
              </ListItem>
            ))}
        </StyledDivList>

        <Stack spacing={2} sx={{ marginTop: 2 }}>
          <Pagination
            count={Math.max(1, Math.ceil(totalCount / pageSize))} // Total pages
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </List>

      {selectedTask && (
        <BasicModal
          tasks={selectedTask}
          open={open}
          onClose={handleCloseModal}
        />
      )}
      {modalDelete.open && (
        <ModalConfirmacao
          open={modalDelete.open}
          onClose={handleCloseModalDelete}
          titulo="Tem certeza que deseja excluir o cadastro?"
          onClickSim={() => {
            console.log("chegou aq", modalDelete.id);
            deletarTask(modalDelete.id);
            handleCloseModalDelete();
          }}
        />
      )}
    </Box>
  );
}
export function FolderList() {
  return (
    <TasksPaginationProvider>
      <App />
    </TasksPaginationProvider>
  );
}
