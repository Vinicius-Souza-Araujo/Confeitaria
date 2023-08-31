import './tabela.css'

const Tabela = ({nomeTabela, colunas, conteudos}) => {
    return(
        <div className='estruturaTabela'>
             <table>
            <caption>{nomeTabela}</caption>
            
            <thead>
                <tr>
                    {colunas.map((coluna, index) => (
                        <th key={index}>{coluna}</th>
                    ))}
                </tr>
            </thead>
        
            <tbody>
                {conteudos.map((conteudo) => (
                        
                    <tr key={conteudo.id}>
                        <td>{conteudo.id}</td>
                        <td>{conteudo.nome}</td>
                        <td>{conteudo.email}</td>
                        <td>{conteudo.cpf}</td>
                        <td>{conteudo.grupo}</td>
                        <td>{conteudo.status}</td>
                    </tr>
              
                ))}
            </tbody>
        </table>
        </div>
       
    )
}

export default Tabela;