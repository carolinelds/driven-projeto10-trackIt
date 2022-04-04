import styled from "styled-components";
import Topo from "./Topo";
import Menu from "./Menu";
import HabitoHoje from "./HabitoHoje";
import { useContext, useState } from "react";
import TodayHabitsContext from "../contexts/TodayHabitsContext";
import ProgressContext from "../contexts/ProgressContext";
import "dayjs/locale/pt";
import * as localizedFormat from 'dayjs/plugin/localizedFormat';

export default function TelaHoje() {

    const { todayHabits, setTodayHabits } = useContext(TodayHabitsContext);
    const { progress, setProgress } = useContext(ProgressContext);
    const [atualizaHabitosHoje, setAtualizaHabitosHoje] = useState(false);

    const dayjs = require('dayjs');
    dayjs.extend(localizedFormat);

    let diaMes = dayjs().toDate();
    diaMes = dayjs(diaMes).format("DD/MM");

    let diaSemana = dayjs().toDate()
    diaSemana = dayjs(diaSemana).locale('pt').format("dddd");
    diaSemana = diaSemana[0].toUpperCase() + diaSemana.substring(1);

    function checarProgresso() {

        return progress === 0 ? (
            <p className="sem-progresso">Nenhum hábito concluído ainda</p>
        ) : (
            <p className="com-progresso">{(progress * 100).toFixed(0)}% dos hábitos concluídos</p>
        )
    }

    return (
        <>
            <Topo />
            <Div>
                <p className="dia-data">{diaSemana}, {diaMes}</p>
                {
                    checarProgresso()
                }
                <div className="habitos-hoje">
                    {
                        todayHabits.map(todayHabit => {
                            const {id, name, done, currentSequence, highestSequence} = todayHabit;

                            return (
                                <HabitoHoje 
                                    key={id}
                                    id={id}
                                    name={name}
                                    done={done}
                                    currentSequence={currentSequence}
                                    highestSequence={highestSequence}
                                    atualizaHabitosHoje={atualizaHabitosHoje}
                                    setAtualizaHabitosHoje={setAtualizaHabitosHoje}
                                />
                            );
                        })
                    }
                </div>
            </Div>
            <Menu atualizaHabitosHoje={atualizaHabitosHoje}/>
        </>
    );
}

const Div = styled.div`
    
    box-sizing: border-box;
    margin-top: 70px;
    padding: 28px 17px 230px 17px;
    background-color: #F2F2F2;
    font-family: 'Lexend Deca';
    height: 100vh;

    .dia-data{
        font-weight: 400;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
        margin-bottom: 1px;
    }

    .sem-progresso,
    .com-progresso {
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #BABABA;
        margin-bottom: 28px;
    }

    .com-progresso {
        color: #8FC549;
    }

`;