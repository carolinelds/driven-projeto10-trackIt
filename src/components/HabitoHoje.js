import styled from "styled-components";
import Checkmark from "./../assets/images/checkmark.svg";
import { useState, useContext } from "react";
import TokenContext from "../contexts/TokenContext";
import axios from "axios";

export default function HabitoHoje(props){
    let {id, name, done, currentSequence, highestSequence, atualizaHabitosHoje, setAtualizaHabitosHoje} = props;

    const [feito, setFeito] = useState(done);

    const { token } = useContext(TokenContext);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    function marcarAxios(){
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,null,config);
        promise.then(response => {
            const { data } = response;
            setAtualizaHabitosHoje(!atualizaHabitosHoje);
        });
        promise.catch(err => console.log(err.response.status));
    }

    function desmarcarAxios(){
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,null,config);
        promise.then(response => {
            const { data } = response;
            setAtualizaHabitosHoje(!atualizaHabitosHoje);
        });
        promise.catch(err => console.log(err.response.status));
    }

    function checarHabito(param){
        if (param === false){
            setFeito(true);
            marcarAxios();
        } else {
            setFeito(false);
            desmarcarAxios();
        }
    }

    function checarSequencia(){
        
        return currentSequence !== 0 && currentSequence === highestSequence ? 
        "recorde-atual" : "recorde-nao-atual"
    }

    return (
        <Div>
            <div className="infos">
                <h2>{name}</h2>
                <p>Sequência atual: <span className={checarSequencia()}>{currentSequence} dias</span></p>
                <p>Seu recorde: {highestSequence} dias</p>
            </div>
            <button onClick={() => checarHabito(feito)} className={feito ? "feito" : "nao-feito"}>
                <img src={Checkmark} alt="Botão: marque para concluir esse hábito"/>
            </button>
        </Div>
    );
}

const Div = styled.div`

    box-sizing: border-box;
    margin-bottom: 10px;
    background-color: white;
    padding: 13px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;

    h2 {
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        margin-bottom: 7px;
    }

    p {
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
        color: #666666;

    }

    button {
        width: 69px;
        height: 69px;
        border: 1px solid #E7E7E7;
        box-sizing: border-box;
        border-radius: 5px;
        border-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .feito {
        background-color: #8FC549;
    }

    .nao-feito {
        background: #EBEBEB;
    }

    .recorde-atual{
        color: #8FC549;
    } 
    
    .recorde-nao-atual {
        color: #666666;
    }
`;