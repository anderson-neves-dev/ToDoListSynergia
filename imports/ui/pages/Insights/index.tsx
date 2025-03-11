import React from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import { GaugeComponet } from "/client/components/Gauge";
import {
  TasksPaginationProvider,
  useTasksPagination,
} from "../../../../client/context/Paggination/TasksPaginationContext";
import { Box, Button, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router";
import { Meteor } from "meteor/meteor";
import { MachineEffectText } from "/client/components/MachineEffectText";

export function App() {
  const nav = useNavigate();
  const user = Meteor.user();
  const { tasksInsights } = useTasksPagination();
  if (!tasksInsights) {
    return <div>Carregando</div>;
  }
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
          boxShadow: 2,
          padding: "30px 20px",
          height: "100px",
        }}
      >
        <MachineEffectText
          text={`Seja bem-vindo${
            user?.profile?.nome ? `, ${user.profile.nome}!` : "!"
          }`}
          speed={100}
        />
      </Box>
      <Box
        sx={{
          width: "80%",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 2,
          boxShadow: 5,
          padding: "30px 20px",
          height: "75vh",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <GaugeComponet
            titulo="Total de Tarefas Cadastradas"
            value={tasksInsights.qtdCadastrada}
            valueMax={tasksInsights.total}
          />
          <GaugeComponet
            titulo="Total de Tarefas Em Andamento"
            value={tasksInsights.qtdEmAndamento}
            valueMax={tasksInsights.total}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <GaugeComponet
            titulo="Total de Tarefas Finalizadas"
            value={tasksInsights.qtdFinalizada}
            valueMax={tasksInsights.total}
          />
          <Button
            sx={{
              width: "100%",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "normal",
              alignItems: "center",
              gap: "28px",
            }}
            onClick={() => nav("/tasks")}
          >
            {" "}
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: "bold",
                fontFamily: "Saira, sans-serif",
                color: "black",
                textTransform: "none",
                marginTop: "-10px",
              }}
            >
              Visualizar Tarefas
            </Typography>
            <AssignmentIcon sx={{ fontSize: "150px" }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export function Insights() {
  return (
    <TasksPaginationProvider>
      <App />
    </TasksPaginationProvider>
  );
}
