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
                {conteudos.map((conteudo, index) => (
                    <tr key={index}>
                        {conteudo.map((item, itemIndex) => (
                            <td key={itemIndex}>{item}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
       
    )
}

export default Tabela;