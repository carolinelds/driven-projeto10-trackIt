import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import TrackItLogo from "./../assets/images/trackit-logo.svg";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TokenContext from "./../contexts/TokenContext";
import UserImageContext from "./../contexts/UserImageContext";
import NameContext from "./../contexts/NameContext";

export default function TelaLogin() {

    const { setToken } = useContext(TokenContext);
    const { setUserImage } = useContext(UserImageContext);
    const { setName } = useContext(NameContext);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);

    function fazerLogin(event) {
        event.preventDefault();
        setCarregando(true);

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", {
            email: email,
            password: senha
        });
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            setToken(data.token);
            setName(data.name);
            setUserImage(data.image);
            mudarPagina();
        });
        promise.catch(err => {
            window.alert("Usuário ou senha inválido(s), tente novamente.");
            console.log(err.status)
            setCarregando(false);
        });
    }

    let navigate = useNavigate();

    function mudarPagina(){
        navigate("/habitos");
    }

    return !carregando ? (
        <Div>
            <img src={TrackItLogo} alt="Logo do TrackIt" />
            <form onSubmit={fazerLogin}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required />
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="senha" required />
                <button type="submit">Entrar</button>
            </form>
            <Link to="/cadastro">
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </Div>
    ) : (
        <Div>
            <img src={TrackItLogo} alt="Logo do TrackIt" />
            <form onSubmit={fazerLogin}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" disabled />
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="senha" disabled />
                <button type="submit" className="carregando" disabled>
                    <ThreeDots color="#FFFFFF" height={50} width={50} />
                </button>
            </form>
            <Link to="/cadastro">
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>
        </Div>
    )
}

const Div = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    
    * {
        font-family: 'Lexend Deca';
    }

    img {
        width: 180px;
        height: auto;
        margin: 68px 0 33px 0;
    }

    form {
        display: flex;
        flex-direction: column;
        margin-bottom: 25px;
    }

    input {
        width: 303px;
        height: 45px;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        margin-bottom: 6px;
        padding-left: 11px;
        overflow-x: hidden;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
    }

    form button {
        color: white;
        width: 303px;
        height: 45px;
        left: 36px;
        top: 381px;
        background-color: #52B6FF;
        border-style: none;
        border-radius: 4.63636px;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        margin-bottom: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p {
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }

    .carregando {
        opacity: 0.5;
    }
`;