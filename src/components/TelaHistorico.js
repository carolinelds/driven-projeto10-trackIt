import styled from "styled-components";
import Topo from "./Topo";
import Menu from "./Menu";

export default function TelaHistorico() {
    return (
        <>
            <Topo />
            <Div>
                <p>TELA HISTORICO</p>
            </Div>
            <Menu />
        </>
    );
}

const Div = styled.div`
    margin-top: 70px;
`;