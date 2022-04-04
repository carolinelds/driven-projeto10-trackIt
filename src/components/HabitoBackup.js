import styled from "styled-components";
import DeleteButton from "./../assets/images/delete-button.svg";
import { useContext } from "react";
import axios from "axios";
import TokenContext from "../contexts/TokenContext";

export default function Habito(props) {

    const { id, name, days, requisicaoAxios } = props;

    function definirSelecionado(num) {
        return days.includes(num) ? "selecionado" : "nao-selecionado";
    }

    const { token } = useContext(TokenContext);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    function apagarHabito(id, name) {

        let queroApagar = window.confirm(`O hábito '${name}' será apagado. Confirma?`);

        if (queroApagar) {
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
            promise.then(() => requisicaoAxios());
            promise.catch(err => console.log(err.response.status));
        }
    }

    return (
        <Div>
            <p>{name}</p>
            <div className="dias">
                <p className={definirSelecionado(0)}>D</p>
                <p className={definirSelecionado(1)}>S</p>
                <p className={definirSelecionado(2)}>T</p>
                <p className={definirSelecionado(3)}>Q</p>
                <p className={definirSelecionado(4)}>Q</p>
                <p className={definirSelecionado(5)}>S</p>
                <p className={definirSelecionado(6)}>S</p>
            </div>
            <button onClick={() => apagarHabito(id, name)} className="botao-apagar">
                <img src={DeleteButton} alt="Botão: aperte para apagar esse hábito" />
            </button>
        </Div>
    );
}

const Div = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
    position: relative;

    Div > p {
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
    }

    .dias {
        display: flex;
        margin-top: 10px;
    }

    .nao-selecionado, .selecionado {
        padding: 2px 7px 2px 7px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #DBDBDB;
        margin-right: 5px;
    }

    .selecionado {
        background-color: #CFCFCF;
        color: white;
    }

    .botao-apagar {
        height: 20px;
        width: 17.333px;
        border-style: none;
        background-color: inherit;
        position: absolute;
        top: 11px;
        right: 17px;
    }

    .botao-apagar img {
        height: 20px;
        width: auto;
    }

    .botao-apagar:hover {
        opacity: 0.5;
    }
`;