import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { TaskInterface } from "/client/interfaces/task";
import BasicModal from "../ModalVisualizar";
import { Box, Button, ButtonGroup, Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  TasksPaginationProvider,
  useTasksPagination,
} from "../../context/Paggination/TasksPaginationContext";
import ModalConfirmacao from "../ModalConfirmacao";
import SearchInput from "../Seach";
import { MachineEffectText } from "../MachineEffectText";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;
const StyledDivHeaderList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: top;
  justify-items: top;
  width: 100%;
  height: 56px;
  gap: 20px;
`;

const StyledDivList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function App() {
  // Importando dados do contexto
  const {
    tasks,
    page,
    pageSize,
    totalCount,
    loading,
    setPage,
    deletarTask,
    user,
    handleToggleSituacao,
    situacao,
    search,
    setSearch,
  } = useTasksPagination();

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
        gap: "30px",
        width: "100%",
        fontFamily: "Saira, sans-serif",
      }}
    >
      <Box
        sx={{
          width: "80%",
          bgcolor: "background.paper",
          display: "flex",
          borderRadius: 2,
          boxShadow: 3,
          padding: "30px 20px",
          height: "100px",
        }}
      >
        <MachineEffectText text={`Tasks`} speed={100} />
      </Box>
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
          padding: "30px 20px",
          height: "75vh",
        }}
      >
        <StyledDivList>
          <StyledDivHeaderList>
            <SearchInput search={search} setSearch={setSearch} />
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
                width: "100%",
                padding: "20px 16px",
              }}
            >
              <AddCircleOutlineIcon sx={{ marginRight: "10px" }} />
              <span>Adicionar Tarefa</span>
            </Button>
          </StyledDivHeaderList>
          <ButtonGroup
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              border: "0px",
              background: "transparent",
              boxShadow: "0px",
              gap: "10px",
            }}
            variant="outlined"
            aria-label="Basic button group"
          >
            {["Cadastrada", "Em Andamento", "Finalizada"].map((status) => (
              <Button
                key={status}
                sx={{
                  width: "100%",
                  backgroundColor: situacao.includes(status)
                    ? "#2E2EFF"
                    : "#B3B3FF",
                  color: "white",
                  fontFamily: "Saira, sans-serif",
                  fontWeight: "700",
                  borderRadius: "20px",
                  "&:hover": {
                    backgroundColor: "#6768F2",
                    cursor: "pointer",
                  },
                }}
                onClick={() => handleToggleSituacao(status)}
              >
                {status}
              </Button>
            ))}
          </ButtonGroup>
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
            count={Math.max(1, Math.ceil(totalCount / pageSize))}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </List>
      {/*Modais */}
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
