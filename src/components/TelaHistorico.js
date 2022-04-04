import styled from "styled-components";
import Topo from "./Topo";
import Menu from "./Menu";
import { useContext } from "react";
import TodayHabitsContext from "../contexts/TodayHabitsContext";
import ProgressContext from "../contexts/ProgressContext";
import WhatsappLogo from "./../assets/images/whatsapp-logo.png";
import "dayjs/locale/pt";
import * as localizedFormat from 'dayjs/plugin/localizedFormat';

export default function TelaHistorico() {

    const { todayHabits } = useContext(TodayHabitsContext);
    const { progress } = useContext(ProgressContext);

    const dayjs = require('dayjs');
    dayjs.extend(localizedFormat);

    let diaMes = dayjs().toDate();
    diaMes = dayjs(diaMes).format("DD/MM/YYYY");

    let diaSemana = dayjs().toDate()
    diaSemana = dayjs(diaSemana).locale('pt').format("dddd");
    diaSemana = diaSemana[0].toUpperCase() + diaSemana.substring(1);

    // 
    let text = `Confira meu progresso no TrackIt, aplicativo para acompanhamento de hábitos: \n\n${diaSemana}, ${diaMes}:
    ${
        todayHabits.map(habit => {
            let txt = `\n- ${habit.name}: ${habit.done ? "feito" : "hoje não deu =("}`;
            return txt
        })
    }\n\n Progresso hoje: ${(progress * 100).toFixed(0)}%`;
    console.log(text);
    text = window.encodeURIComponent(text);

    function enviarWhats(){
        window.open("https://wa.me/send?text=" + text, "_blank");
    }
    

    return (
        <>
            <Topo />
            <Div>
                <h1>Histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                <div className="whatsapp-container">
                    <p>Enquanto isso, compartilhe com amigos seu progresso diário:</p>
                    <button onClick={enviarWhats}>
                        <img src={WhatsappLogo} alt="Botão: clique para compartilhar via WhatsApp"/>
                    </button>
                </div>
            </Div>
            <Menu />
        </>
    );
}

const Div = styled.div`
    box-sizing: border-box;
    margin-top: 70px;
    font-family: 'Lexend Deca';
    padding: 28px 20px 0px 20px;

    h1 {
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
        margin-bottom: 17px;
    }

    p {
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }

    .whatsapp-container {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .whatsapp-container p {
        font-size: 15px;
        padding-left: 20px;
    }

    .whatsapp-container button {
        margin-left: 15px;
        border-style: none;
        background-color: inherit;
    }

    .whatsapp-container button img {
        height: 35px;
        width: auto;
        padding-right: 20px;
    }

    .whatsapp-container button img:hover {
        opacity: 0.5;
    }

`;