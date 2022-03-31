import "./assets/css/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import TelaLogin from "./components/TelaLogin";
import NameContext from "./contexts/NameContext";
import UserImage from "./contexts/UserImageContext";
import TokenContext from "./contexts/TokenContext";

export default function App() {
    const [name, setName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [token, setToken] = useState("");

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            <NameContext.Provider value={{ name, setName }}>
                <UserImage.Provider value={{ userImage, setUserImage }}>

                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<TelaLogin />}></Route>
                        </Routes>
                    </BrowserRouter>

                </UserImage.Provider>
            </NameContext.Provider>
        </TokenContext.Provider>
    );
}

