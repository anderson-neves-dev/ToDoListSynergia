import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export function ProtectedRoute({ isPrivate }: { isPrivate: boolean }) {
  const { user, isLoading } = useTracker(() => {
    return {
      user: Meteor.user(),
      isLoading: Meteor.loggingIn(),
    };
  });

  if (isLoading) {
    // Enquanto o login está sendo processado vai ser exibido um loading
    return <div>Carregando...</div>;
  }

  if (user && !isPrivate) {
    // Redirecionamento para Usuario Logado
    return <Navigate to="/" replace />;
  }

  if (!user && isPrivate) {
    // Redirecionamento para Usuario não Logado
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
