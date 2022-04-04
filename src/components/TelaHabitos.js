import Topo from "./Topo";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import TokenContext from "./../contexts/TokenContext";
import axios from "axios";
import CriarHabito from "./CriarHabito";
import Habito from "./Habito";
import Menu from "./Menu";

export default function TelaHabitos() {

    const [habitos, setHabitos] = useState(null);
    const [criarHabito, setCriarHabito] = useState(false);
    const [atualizaHabitosHoje, setAtualizaHabitosHoje] = useState(false);

    const { token } = useContext(TokenContext);
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    function requisicaoAxios(){
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);

        promise.then(response => {
            const { data } = response;
            console.log(data);
            setHabitos(data);
            setAtualizaHabitosHoje(!atualizaHabitosHoje);
        });

        promise.catch(err => console.log(err.response.status));
    }

    useEffect(() => {
        requisicaoAxios();        
    }, []);

    function renderizarCriarHabito() {
        return criarHabito ? (
            <CriarHabito 
                setCriarHabito={setCriarHabito}
                requisicaoAxios={requisicaoAxios}
            />
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
            <Menu atualizaHabitosHoje={atualizaHabitosHoje}/>
        </>
    ) : ( 
        habitos !== null ? 
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
                {
                    habitos.map(habito => {
                        const {id, name, days} = habito;
                        return <Habito key={id} id={id} name={name} days={days} requisicaoAxios={requisicaoAxios}/>
                    })
                }
            </Div>
            <Menu atualizaHabitosHoje={atualizaHabitosHoje}/>
        </> : <p>Carregando...</p>
    )
}

const Div = styled.div`
    margin-top: 70px;
    background-color: #F2F2F2;
    font-family: 'Lexend Deca';
    padding: 22px 18px 50px 18px;
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