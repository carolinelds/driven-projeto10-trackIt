import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TokenContext from "./../contexts/TokenContext";
import axios from "axios";
import TodayHabitsContext from "./../contexts/TodayHabitsContext";
import ProgressContext from "../contexts/ProgressContext";

export default function Menu(props) {

    let {atualizaHabitosHoje} = props;

    const { setTodayHabits } = useContext(TodayHabitsContext);
    const { token } = useContext(TokenContext);
    const { progress, setProgress } = useContext(ProgressContext);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    function requisicaoAxiosHoje() {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config);
        promise.then(response => {
            const { data } = response;
            setTodayHabits(data);
            const novoProgresso = calcularProgresso(data);
            setProgress(novoProgresso);
        });
        promise.catch(err => console.log(err.response.status));
    }

    useEffect(() => {
        requisicaoAxiosHoje();
    }, [atualizaHabitosHoje]);


    function calcularProgresso(dados) {
        if (dados !== null && dados.length > 0) {
            let cont = 0;
            dados.forEach(habit => {
                return habit.done === true ? cont++ : null
            });
            const total = dados.length;
            return cont / total;
            //return 0.5; // para testes
        } else {
            return 1;
        }
    }

    return (
        <Div>
            <Link to="/habitos">
                <p>Hábitos</p>
            </Link>
            <Link to="/hoje">
                <div className="progressbar">
                    <p>Hoje</p>
                    <CircularProgressbar
                        value={progress}
                        maxValue={1}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                          })
                        }
                    />
                </div>
            </Link>
            <Link to="/historico">
                <p>Histórico</p>
            </Link>
        </Div>
    );
}

const Div = styled.div`
    box-sizing: border-box;
    position: fixed;
    bottom: 0px;
    left: 0px;
    height: 70px;
    width: 100%;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 31px 0px 36px;
    
    p {
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
    }

    .progressbar {
        border-radius: 50%;
        height: 91px;
        width: 91px;
        position: absolute;
        bottom: 10px;
        left: calc((100vw / 2) - (91px / 2));
    }

    .progressbar p {
        border-radius: 50%;
        height: 91px;
        width: 91px;
        color: white;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }


`;