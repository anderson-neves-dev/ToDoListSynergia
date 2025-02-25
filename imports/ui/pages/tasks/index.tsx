import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/tasksColletion";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import FolderList from "/client/components/List";
import { TaskInterface } from "/client/interfaces/task";
import { Button, ButtonGroup } from "@mui/material";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
`;
export const Tasks = () => {
  const user = useTracker(() => Meteor.user());
  const [situacao, setSituacao] = useState("Cadastrada");

  const isLoadings = useSubscribe("tasks");
  console.log(user?._id);

  const tasks: TaskInterface[] = useTracker(() => {
    return TasksCollection.find().fetch() as TaskInterface[];
  });

  const filteredTasks: TaskInterface[] = useTracker(() => {
    if (situacao === "Todas") {
      return TasksCollection.find().fetch() as TaskInterface[];
    }
    return TasksCollection.find({ situacao }).fetch() as TaskInterface[];
  });

  return (
    <StyledDiv>
      <ButtonGroup
        sx={{
          width: "80%",
          height: "50px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          border: "0px",
          background: "transparent",
          boxShadow: "0px",
        }}
        variant="outlined"
        aria-label="Basic button group"
      >
        <Button
          sx={{
            width: "30%",
            backgroundColor: "  #4343ef",

            color: "white",
            fontFamily: "Saira, sans-serif",
            fontWeight: "700",
            borderRadius: "20px",
            "&:hover": {
              // Aqui está o ajuste!
              backgroundColor: "#6768F2",
              cursor: "pointer",
            },
          }}
          onClick={() => setSituacao("Cadastrada")}
        >
          Cadastrada
        </Button>
        <Button
          sx={{
            width: "30%",
            backgroundColor: "  #4343ef",

            color: "white",
            fontFamily: "Saira, sans-serif",
            fontWeight: "700",
            borderRadius: "20px",
            "&:hover": {
              // Aqui está o ajuste!
              backgroundColor: "#6768F2",
              cursor: "pointer",
            },
          }}
          onClick={() => setSituacao("Em Andamento")}
        >
          Em Andamento
        </Button>
        <Button
          sx={{
            width: "30%",
            backgroundColor: "  #4343ef",

            color: "white",
            fontFamily: "Saira, sans-serif",
            fontWeight: "700",
            borderRadius: "20px",
            "&:hover": {
              // Aqui está o ajuste!
              backgroundColor: "#6768F2",
              cursor: "pointer",
            },
          }}
          onClick={() => setSituacao("Concluída")}
        >
          Concluída
        </Button>
      </ButtonGroup>
      <FolderList tasks={filteredTasks} />
    </StyledDiv>
  );
};
