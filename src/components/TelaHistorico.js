import styled from "styled-components";
import Topo from "./Topo";
import Menu from "./Menu";

export default function TelaHistorico() {
    return (
        <>
            <Topo />
            <Div>
                <h1>Histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
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
`;