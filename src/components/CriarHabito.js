import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import TokenContext from "./../contexts/TokenContext";

export default function CriarHabito(props) {

    let { setCriarHabito } = props;

    const [nomeHabito, setNomeHabito] = useState("");
    const [dias, setDias] = useState([]);

    const { token } = useContext(TokenContext);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    function definirDias(num){
        if (dias.includes(num)){
            let pos = dias.indexOf(num);
            dias.splice(pos,1);
            dias.sort();
            setDias(dias);
        } else {
            dias.push(num);
            dias.sort();
            setDias(dias);
        }
    }

    function salvarHabito(event) {
        event.preventDefault();

        const body  = {
            name: nomeHabito,
            days: dias
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);
        promise.then(response => {
            const {data} = response;
            console.log(data);
        });
        promise.catch(err => console.log(err.response.status));
    }

    return (
        <Div>
            <form onSubmit={salvarHabito}>
                <input type="text" value={nomeHabito} onChange={e => setNomeHabito(e.target.value)} placeholder="nome do hábito" required />
                <div className="dias">
                    <input type="checkbox" id="dia0" name="dia0" value="Domingo" />
                    <label htmlFor="dia0" onClick={() => definirDias(0)}>D</label>

                    <input type="checkbox" id="dia1" name="dia1" value="Segunda" />
                    <label htmlFor="dia1" onClick={() => definirDias(1)}>S</label>

                    <input type="checkbox" id="dia2" name="dia2" value="Terça" />
                    <label htmlFor="dia2" onClick={() => definirDias(2)}>T</label>

                    <input type="checkbox" id="dia3" name="dia3" value="Quarta" />
                    <label htmlFor="dia3" onClick={() => definirDias(3)}>Q</label>

                    <input type="checkbox" id="dia4" name="dia4" value="Quinta" />
                    <label htmlFor="dia4" onClick={() => definirDias(4)}>Q</label>

                    <input type="checkbox" id="dia5" name="dia5" value="Sexta" />
                    <label htmlFor="dia5" onClick={() => definirDias(5)}>S</label>

                    <input type="checkbox" id="dia6" name="dia6" value="Sábado" />
                    <label htmlFor="dia6" onClick={() => definirDias(6)}>S</label>
                </div>
                <div className="buttons">
                    <button onClick={() => setCriarHabito(false)}> Cancelar</button>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </Div>
    );
}

const Div = styled.div`

    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 18px;
    border-radius: 5px;
    margin-bottom: 30px;

    form > input {
        width: 303px;
        height: 45px;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        padding-left: 11px;
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        margin-bottom: 10px;
    }

    form .dias label {
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

    input[type=checkbox]:checked + label {
    	color: white;
        background-color: #CFCFCF;
    }

    form .dias input {
        display: none;
    }

    form .dias {
        margin-bottom: 30px;
    }

    form .buttons {
        display: flex;
        justify-content: right;
    }

    form .buttons button:first-of-type {
        border-style: none;
        margin-right: 25px;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #52B6FF;
        background-color: inherit;
    }

    form .buttons button:last-of-type {
        border-style: none;
        width: 84px;
        height: 35px;
        background: #52B6FF;
        border-radius: 5px;
        color: white;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
    }
`;