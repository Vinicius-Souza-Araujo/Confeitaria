import "./botoes.css"

export const BotaoRosa = (props) => {

    return(     
        <button className="botaoRosa">{props.texto}</button>     
    )
}

export const BotaoAzul = (props) => {
    return(
        <button className="botaoAzul">{props.texto}</button>   
    )
}

export const BotaoCiano = (props) => {
    return(
        <button className="botaoCiano">{props.texto}</button> 
    )
}

export const BotaoSummit = (props) => {
    return(
        <input className="botaoSummit" type="submit" id={props.id} value={props.texto} />
    )
}






