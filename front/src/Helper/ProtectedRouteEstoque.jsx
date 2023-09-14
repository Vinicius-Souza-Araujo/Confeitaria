import React from 'react';
import {UserContext} from '../UserContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRouteEstoque = ({children}) => {
    const {data} = React.useContext(UserContext);
    if(data && data.grupo === 'ESTOQUISTA'){
        return children;
    } else {
        return <Navigate to="/"/>
    }
}

export default ProtectedRouteEstoque