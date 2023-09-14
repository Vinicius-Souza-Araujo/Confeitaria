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

export function GET_PRODUTOS(token, paginacao){
    return{
        
        url: API_URL+'/produtos/?page='+paginacao,
        options:{
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + token,
            }
        }
    }
}

export function GET_PRODUTOS_SEM_FILTRO(token, itemBusca){
    return{
        
        url: API_URL+'/produtos/?page&nome='+itemBusca,
        options:{
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + token,
            }
        }
    }
}


export function GET_PRODUTOS_ATIVADOS(token){
    return{
        
        url: API_URL+'/produtos/?page&status=ATIVADO',
        options:{
            method:'GET'
        }
    }
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
        } 
    };
}

export function POST_PRODUTO(body, token){
    return{
        url:API_URL+'/produtos/cadastrar',
        options:{ 
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body:JSON.stringify(body),
        } 
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


export function PATCH_USER(body, token, id){
    return{
        url:API_URL+'/users/atualizar/'+id,
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

export function PUT_PRODUTOS(body, token){
    return{
        url:API_URL+'/produtos/',
        options:{ 
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body:JSON.stringify(body),
        }, 
    }
}


