import React from "react";
import { Route, Routes } from "react-router";
import { Login } from "./pages/login";
import { ProtectedRoute } from "./ProtectedRouter";
import MiniDrawer from "./pages/DefaultLayout";
import { Tasks } from "./pages/tasks";
import CadastrarTask from "./pages/CadastrarTask";
import TodoList from "./pages/Paggination/teste";

export const App = () => (
  <div>
    <Routes>
      <Route element={<ProtectedRoute isPrivate />}>
        <Route path="/" element={<MiniDrawer />}>
          <Route path="/" element={<div>Ola</div>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/cadastrar-task" element={<CadastrarTask />} />
          <Route path="/a" element={<TodoList />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute isPrivate={false} />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  </div>
);
