import "./assets/css/reset.css";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TelaLogin from "./components/TelaLogin";
import TelaCadastro from "./components/TelaCadastro";
import TelaHabitos from "./components/TelaHabitos";
import TelaHoje from "./components/TelaHoje";
import TelaHistorico from "./components/TelaHistorico";
import NameContext from "./contexts/NameContext";
import UserImage from "./contexts/UserImageContext";
import TokenContext from "./contexts/TokenContext";
import TodayHabitsContext from "./contexts/TodayHabitsContext";
import ProgressContext from "./contexts/ProgressContext";

export default function App() {
    const [name, setName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [token, setToken] = useState("");
    const [todayHabits, setTodayHabits] = useState(null);
    const [progress, setProgress] = useState(0);

    return (
        <Div>
            <TokenContext.Provider value={{ token, setToken }}>
                <NameContext.Provider value={{ name, setName }}>
                    <UserImage.Provider value={{ userImage, setUserImage }}>
                        <TodayHabitsContext.Provider value={{ todayHabits, setTodayHabits }}>
                            <ProgressContext.Provider value={{ progress, setProgress }}>

                                <BrowserRouter>
                                    <Routes>
                                        <Route path="/" element={<TelaLogin />}></Route>
                                        <Route path="/cadastro" element={<TelaCadastro />}></Route>
                                        <Route path="/habitos" element={<TelaHabitos />}></Route>
                                        <Route path="/hoje" element={<TelaHoje />}></Route>
                                        <Route path="/historico" element={<TelaHistorico />}></Route>
                                    </Routes>
                                </BrowserRouter>

                            </ProgressContext.Provider>
                        </TodayHabitsContext.Provider>
                    </UserImage.Provider>
                </NameContext.Provider>
            </TokenContext.Provider>
        </Div>
    );
}

const Div = styled.div`
    background-color: #F2F2F2;
`;

