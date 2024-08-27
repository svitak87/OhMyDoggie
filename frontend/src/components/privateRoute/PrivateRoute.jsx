import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = useSelector((state) => state.token);

  return (
    <Route
      {...rest}
      element={token ? Component : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
