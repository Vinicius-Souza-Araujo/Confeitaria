import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TOKEN_POST } from './Api';

export const UserContext = React.createContext();


export const UserStorage = ({children}) => {
    const [data, setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    
}
