import React from "react";
import { Route, Routes } from "react-router";
import { Login } from "./pages/login";

export const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </div>
);
