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
    // Enquanto o login está sendo processado, você pode exibir um loading ou retornar null
    return <div>Carregando...</div>;
  }

  if (user && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  if (!user && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
