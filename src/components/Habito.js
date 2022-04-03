import styled from "styled-components";

export default function Habito(props){

    const {name, days} = props;

    function definirSelecionado(num){
        return days.includes(num) ? "selecionado" : "nao-selecionado"; 
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
        </Div>
    );
}

const Div = styled.div`
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;

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


`;