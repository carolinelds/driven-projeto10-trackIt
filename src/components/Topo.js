import styled from "styled-components";
import { useContext } from "react";
import NameContext from "../contexts/NameContext";
import UserImageContext from "../contexts/UserImageContext";
import ReducedLogo from "../assets/images/trackit-reduced-logo.svg";

export default function Topo() {
    const { name } = useContext(NameContext);
    const { userImage } = useContext(UserImageContext);

    return (
        <Div>
            <img className="trackit-reduced-logo" src={ReducedLogo} alt="TrackIt em letra cursiva" />

            <div className="user-infos-container">
                <p>Olá, {name}!</p>
                <img className="user-image" src={userImage} alt="Sua foto" />
            </div>
        </Div>
    );
}

const Div = styled.div`
    
    box-sizing: border-box;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    height: 70px;
    width: 100%;
    padding-left: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1;

    .trackit-reduced-logo{
        color: white;
        width: 97px;
        height: auto;
    }

    .user-infos-container {
        display: flex;
        align-items: center;
        margin-right: 18px;
    }

    .user-infos-container p {
        color: white;
        font-family: 'Lexend Deca';
        font-weight: 400;
        font-size: 15px;
        line-height: 26px;
    }

    .user-infos-container img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
        background-image: inherit;
        margin-left: 20px;
    }


`;