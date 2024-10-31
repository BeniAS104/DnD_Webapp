import { Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import BurgerMenu from "./components/Burger";
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import "./styles/index.css"; // Main stylesheet

function App() {
    const location = useLocation(); // Get the current location

    // Function to determine the current page text based on the path
    const getCurrentPageText = () => {
        switch (location.pathname) {
            case "/":
                return ""; // Text for the Home page
            case "/characters":
                return "Your Characters"; // Text for the Characters page
            default:
                return ""; // Default text if no match is found
        }
    };

    return (
        <>
            <BurgerMenu currentPageText={getCurrentPageText()} /> {/* Pass the current page text */}
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<Characters />} />
            </Routes>
        </>
    );
}

export default App;
