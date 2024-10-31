// src/App.jsx
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import "./styles/index.css"; // Main stylesheet

function App() {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<Characters />} />
            </Routes>
        </>
    );
}

export default App;
