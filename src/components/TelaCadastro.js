import styled from "styled-components";
import axios from "axios";
import TrackItLogo from "./../assets/images/trackit-logo.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TelaCadastro() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");

    function fazerCadastro(event) {
        event.preventDefault();

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
            {
                email: email,
                name: nome,
                image: foto,
                password: senha
            });
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            mudarPagina();
        });
        promise.catch(err => console.log(err.status));
    }

    let navigate = useNavigate();

    function mudarPagina(){
        navigate("/");
    }

    return (
        <Div>
            <img src={TrackItLogo} alt="Logo do TrackIt" />
            <form onSubmit={fazerCadastro}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required />
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="senha" required />
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="nome" required />
                <input type="url" value={foto} onChange={e => setFoto(e.target.value)} placeholder="foto (url)" required />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Div>
    );
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
    }

    p {
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`;