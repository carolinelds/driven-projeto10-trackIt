import Topo from "./Topo";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import TokenContext from "./../contexts/TokenContext";
import axios from "axios";
import CriarHabito from "./CriarHabito";


export default function TelaHabitos() {

    const [habitos, setHabitos] = useState(null);
    const [criarHabito, setCriarHabito] = useState(false);

    const { token } = useContext(TokenContext);
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    useEffect(() => {
        
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        promise.then(response => {
            const { data } = response;
            console.log(data);
            setHabitos(data);
        });

        promise.catch(err => console.log(err.response.status));
    }, []);

    function renderizarCriarHabito() {
        return criarHabito ? (
            <CriarHabito setCriarHabito={setCriarHabito}/>
        ) : null
    }

    return habitos !== null && habitos.length < 1 ? (
        <>
            <Topo />
            <Div>
                <header>
                    <h1>Meus hábitos</h1>
                    <button onClick={() => setCriarHabito(true)}>+</button>
                </header>
                {
                    renderizarCriarHabito()
                }
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            </Div>
        </>
    ) : (
        <>
            <Topo />
            <Div>
                <header>
                    <h1>Meus hábitos</h1>
                    <button onClick={() => setCriarHabito(true)}>+</button>
                </header>
                {
                    renderizarCriarHabito()
                }
                <p>Renderiza hábitos</p>
            </Div>
        </>
    )
}

const Div = styled.div`

    background-color: #F2F2F2;
    font-family: 'Lexend Deca';
    padding: 22px 18px 0px 18px;
    height: 100vh;
    
    header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 28px;
    }

    header h1 {
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }

    header button {
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 5px;
        border-style: none;
        color: white;
        font-weight: 400;
        font-size: 27px;
        line-height: 34px;
    }

    p {
        color: #666666;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
    }

    
`;