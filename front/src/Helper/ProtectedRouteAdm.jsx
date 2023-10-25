import React from 'react';
import {UserContext} from '../UserContext';
import { Navigate } from 'react-router-dom';

export const ProtectedRouteAdm = ({children}) => {
    const {data} = React.useContext(UserContext);
    if(data && data.grupo === 'ADM'){
        return children;
    } else {
        return <Navigate to="/"/>
    }
}

export default ProtectedRouteAdm
