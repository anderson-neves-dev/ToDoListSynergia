import React from "react";
import { Route, Routes } from "react-router";
import { Login } from "./pages/login";
import { ProtectedRoute } from "./ProtectedRouter";
import MiniDrawer from "./pages/DefaultLayout";
import { Tasks } from "./pages/tasks";
import TodoList from "./pages/Paggination/teste";
import { CadastrarUser } from "./pages/Login/CadastrarUser";
import CadastrarTask from "./pages/CadastrarTask";
import EditarTask from "./pages/EditarTask";

export const App = () => (
  <div>
    <Routes>
      <Route element={<ProtectedRoute isPrivate />}>
        <Route path="/" element={<MiniDrawer />}>
          <Route path="/" element={<div>Ola</div>} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/cadastrar-task" element={<CadastrarTask />} />
          <Route path="/editar-task/:id" element={<EditarTask />} />
          <Route path="/a" element={<TodoList />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute isPrivate={false} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar-usuario" element={<CadastrarUser />} />
      </Route>
    </Routes>
  </div>
);
