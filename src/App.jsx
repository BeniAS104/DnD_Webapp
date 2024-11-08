import { Route, Routes, useLocation } from "react-router-dom";

import BurgerMenu from "./components/Burger";
import Home from "./pages/Home";
import FindPals from "./pages/FindPals";
import DiceRoller from "./pages/DiceRoller";
import MyPals from "./pages/MyPals";
import AdventureJournal from "./pages/AdventureJournal";
import PlayerChat from "./pages/PlayerChat";
import Inspiration from "./pages/InspirationsPage";
import "./styles/index.css";


function App() {
  const location = useLocation();

  const getCurrentPageText = () => {
    if (location.pathname === "/") return "";
    if (location.pathname === "/findPals") return "Find Pals";
    if (location.pathname === "/MyPals") return "My Pals";
    if (location.pathname === "/DiceRoller") return "Dice Roller";
    if (location.pathname.startsWith("/AdventureJournal")) return "Adventure Journal"; // Catch all paths for AdventureJournal
    if (location.pathname === "/characterSheets") return "Character Sheets";
    if (location.pathname === "/PlayerChat") return "My Pals";
    if (location.pathname === "/Inspiration") return "Inspiration";
    return ""; 
  };
  

  return (
    <>
      <BurgerMenu currentPageText={getCurrentPageText()} />{" "}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FindPals" element={<FindPals />} />
        <Route path="/AdventureJournal/*" element={<AdventureJournal />} />
        <Route path="/DiceRoller" element={<DiceRoller />} />
        <Route path="/MyPals" element={<MyPals />} />
        <Route path="/PlayerChat" element={<PlayerChat />} />
        <Route path="/Inspiration" element={<Inspiration/>} />
      </Routes>
    </>
  );
}

export default App;
