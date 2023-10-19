import React from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRouteAdm = ({ children }) => {
  const { data } = React.useContext(UserContext);
  if (data && data.grupo === 'ADM') {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export const ProtectedRouteEstoquista = ({ children }) => {
  const { data } = React.useContext(UserContext);
  if (data && data.grupo === 'ESTOQUISTA') {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export const ProtectedRouteCliente = ({ children }) => {
  const { data } = React.useContext(UserContext);
  if (data && data.grupo === 'CLIENTE') {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
