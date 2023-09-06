const API_URL = 'http://localhost:8080/api';

export function TOKEN_POST(body){
    return{
        url:API_URL+'/users/login',
        options:{ 
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(body),
        }, 
    };
}

export function GET_USERS(token, filtro){
    return{
        url:API_URL+'/users?nome='+filtro,
        options:{ 
            method:'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }, 
    };
}

export function POST_USER(body, token){
    return{
        url:API_URL+'/users/cadastrar',
        options:{ 
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body:JSON.stringify(body),
        }, 
    };
}

export function PATCH_STATUS(body, token, id){
    return{
        url:API_URL+'/users/atualizar/status/'+id,
        options:{ 
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body:JSON.stringify(body),
        }, 
    };
}

export function DELETE_USER(token, id) {
    return{
        url:API_URL+'/users/'+id,
        options: {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        },
    };
}

export function UPDATE_USER(token, userData) {
    const { id, nome, cpf, grupo, status } = userData;
    return {
        url: API_URL + '/users/' + id,
        options: {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                nome,
                cpf,
                grupo,
                status,
            }),
        },
    };
}