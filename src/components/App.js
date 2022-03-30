import "./../assets/css/reset.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaLogin from "./TelaLogin"

export default function App() {

    return (
        <BrowserRouter>
            <Routes> 
                <Route path="/" element={<TelaLogin />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

