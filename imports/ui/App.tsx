import React from "react";
import { Route, Routes } from "react-router";
import { Login } from "./pages/Login/login";
import { ProtectedRoute } from "./ProtectedRouter";
import MiniDrawer from "./pages/DefaultLayout";
import { Tasks } from "./pages/tasks";
import { CadastrarUser } from "./pages/Login/CadastrarUser";
import CadastrarTask from "./pages/CadastrarTask";
import EditarTask from "./pages/EditarTask";
import Usuario from "./pages/Usuario";
import { Insights } from "./pages/Insights";
import { ForgotPassword } from "./pages/Login/SenhaEsquecida";

export const App = () => (
  <div>
    <Routes>
      <Route element={<ProtectedRoute isPrivate />}>
        <Route path="/" element={<MiniDrawer />}>
          <Route path="/" element={<Insights />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/cadastrar-task" element={<CadastrarTask />} />
          <Route path="/editar-task/:id" element={<EditarTask />} />
          <Route path="/usuario" element={<Usuario />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute isPrivate={false} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar-usuario" element={<CadastrarUser />} />
        <Route path="/resetar-senha" element={<ForgotPassword />} />
      </Route>
    </Routes>
  </div>
);
