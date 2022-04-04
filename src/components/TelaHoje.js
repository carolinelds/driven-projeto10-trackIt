import styled from "styled-components";
import Topo from "./Topo";
import Menu from "./Menu";

export default function TelaHoje() {
    return (
        <>
            <Topo />
            <Div>
                <p>TELA HOJE</p>
            </Div>
            <Menu />
        </>
    );
}

const Div = styled.div`

`;