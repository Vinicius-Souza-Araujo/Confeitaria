import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_POST } from './Api';

export const UserContext = React.createContext();


export const UserStorage = ({children}) => {
    const [data, setData] = React.useState({email:null, grupo:null, token:null});
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();

    async function userLogin(email, senha){
        try{
            setError(null);
            setLogin(true);
            const {url, options} = TOKEN_POST({email, senha});
            const tokenRes = await fetch(url, options);
            if (!tokenRes.ok) throw new Error('Acesso negado, verifique suas credenciais!');
            const json = await tokenRes.json();
            window.localStorage.setItem('token', json.token);
            setData({email:json.email, grupo:json.grupo, token:json.token});
            setLogin(true);
            navigate('/administrador');
        } catch(err){
            setError(err.message);
            setLoading(false); 
        } finally{
            setLoading(false);
        }
    }
    
    return (
        <UserContext.Provider value={{userLogin, data, error, loading, login }}>
            {children}
        </UserContext.Provider>
      )
}
