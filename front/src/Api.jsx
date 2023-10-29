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

export function GET_PRODUTOS(paginacao){
    return{
        
        url: API_URL+'/produtos/?page='+paginacao,
        options:{
            method:'GET'
            
        }
    }
}

export function GET_PRODUTOS_SEM_FILTRO(itemBusca){
    return{
        
        url: API_URL+'/produtos/?page&nome='+itemBusca,
        options:{
            method:'GET'
        }
    }
}


export function GET_PRODUTOS_ATIVADOS(){
    return{
        
        url: API_URL+'/produtos/?page&status=ATIVADO',
        options:{
            method:'GET'
        }
    }
}

export function GET_PRODUTOS_ID(id){
    return{
        url: API_URL+'/produtos/?page&id='+id,
        options:{
            method:'GET'
        }
    }
}

export function GET_PRODUTOS_ESTOQUE(page){
    return{
        
        url: API_URL+'/produtos/?page='+page,
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


export function POST_CLIENTE(body){
    return{
        url:API_URL+'/users/cadastrarCliente',
        options:{ 
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
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


export function PATCH_ESTOQUE(body, id){
    return{
        url:API_URL+'/produtos/atualizarEstoque/'+id,
        options:{ 
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
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

export function PATCH_CLIENTE(body, idCliente){
    return{
        url:API_URL+'/users/atualizarCliente'+idCliente,
        options:{ 
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(body),
        }, 
    };
}

export function PATCH_SENHA(body, token, id){
    return{
        url:API_URL+'/users/atualizar/senha/'+id,
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


export function PUT_IMAGEM(id, nomeImagem, novaImagem, token) {
    const formData = new FormData();
    formData.append('file', novaImagem);
  
    return {
      url: `${API_URL}/imagens/atualizar/${id}/${nomeImagem}`,
      options: {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        body: formData,
      },
    };
  }
  

export function POST_UPLOAD_IMAGEM(formData, token){
    return{
        url: API_URL + '/imagens/upload',
        options: {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + token,
            },
            body: formData,
           },
    };

}




export function GET_CEP(cep){
    return{
        url: 'https://viacep.com.br/ws/'+cep+'/json/',
        options: {
            method: 'GET'
        }
    }
}



