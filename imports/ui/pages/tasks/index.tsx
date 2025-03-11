import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/tasksColletion";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { FolderList } from "/client/components/List";
import { TaskInterface } from "/client/interfaces/task";
import { Button, ButtonGroup, Pagination, Stack } from "@mui/material";
import styled from "styled-components";
import {
  TasksPaginationProvider,
  useTasksPagination,
} from "../../../../client/context/Paggination/TasksPaginationContext";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
`;
const App = () => {
  const user = useTracker(() => Meteor.user());
  const isLoadings = useSubscribe("tasks");

  return (
    <StyledDiv>
      <FolderList />
    </StyledDiv>
  );
};
export function Tasks() {
  return (
    <TasksPaginationProvider>
      <App />
    </TasksPaginationProvider>
  );
}
