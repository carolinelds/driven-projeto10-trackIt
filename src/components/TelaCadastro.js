import styled from "styled-components";
import axios from "axios";
import TrackItLogo from "./../assets/images/trackit-logo.svg";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function TelaCadastro() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [imagemPadraoChecked, setImagemPadraoChecked] = useState(false);

    function fazerCadastro(event) {
        event.preventDefault();
        setCarregando(true);

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
        promise.catch(err => {
            window.alert("Erro no cadastro, tente novamente.");
            console.log(err.status);
            setCarregando(false);
        });
    }

    let navigate = useNavigate();

    function mudarPagina() {
        navigate("/");
    }

    function definirImagemPadrao(){

        if (!imagemPadraoChecked)
        {
            setFoto("https://www.ziu.net.br/semfoto.jpg")
            setImagemPadraoChecked(true);
        } else {
            setFoto("");
            setImagemPadraoChecked(false);
        }
        
    }

    return !carregando ? (
        <Div>
            <img src={TrackItLogo} alt="Logo do TrackIt" />
            <form onSubmit={fazerCadastro}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required />
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="senha" required />
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="nome" required />
                <input type="url" value={foto} onChange={e => setFoto(e.target.value)} placeholder="foto (url)" required />

                <div className="select-auto-image">
                    <input className="checkbox" type="checkbox" id="userAvatar" name="usarAvatar" value="image" onClick={definirImagemPadrao}/>
                    <label htmlFor="userAvatar">Usar imagem padrão</label>
                </div>

                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/">
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Div>
    ) : (
        <Div>
            <img src={TrackItLogo} alt="Logo do TrackIt" />
            <form onSubmit={fazerCadastro}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" disabled />
                <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="senha" disabled />
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="nome" disabled />
                <input type="url" value={foto} onChange={e => setFoto(e.target.value)} placeholder="foto (url)" disabled />

                <div className="select-auto-image">
                    <input className="checkbox" type="checkbox" id="userAvatar" name="usarAvatar" value="image" onClick={definirImagemPadrao} disabled/>
                    <label htmlFor="userAvatar">Usar imagem padrão</label>
                </div>

                <button type="submit" disabled>
                    <ThreeDots color="#FFFFFF" height={50} width={50} />
                </button>
            </form>
            <Link to="/">
                <p>Já tem uma conta? Faça login!</p>
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
        font-size: 20px;
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
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }

    .select-auto-image {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .select-auto-image label {
        font-weight: 400;
        font-size: 20px;
        line-height: 25px;
        color: #666666;;
    }

    .checkbox {
        width: 15px;
        height: 15px;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        margin-top: 7px;
        margin-right: 10px;
        padding-left: 11px;
        overflow-x: hidden;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
    }
`;