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