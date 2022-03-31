import styled from "styled-components";
import axios from "axios";
import TrackItLogo from "./../assets/images/trackit-logo.svg";
import { useContext, useState } from "react";
import TokenContext from "./../contexts/TokenContext";
import UserImageContext from "./../contexts/UserImageContext";
import NameContext from "./../contexts/NameContext";

export default function TelaLogin() {

    const { setToken } = useContext(TokenContext);
    const { setUserImage } = useContext(UserImageContext);
    const { setName } = useContext(NameContext);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    function fazerLogin(event) {
        event.preventDefault(); 

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {
            email: email,
            password: senha
        });
        promise.then((response) => {
            const {data} = response;
            setToken(data.token);
            setName(data.name);
            setUserImage(data.image);
        });
        promise.catch(err => console.log(err.status));
    }

    return (
        <Div>
            <img src={TrackItLogo} alt="Logo do TrackIt" />
            <form onSubmit={fazerLogin}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required/>
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="senha" required/>
                <button type="submit">Entrar</button>
            </form>
        </Div>
    );
}

const Div = styled.div`

`;