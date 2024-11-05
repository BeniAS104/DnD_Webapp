import { Route, Routes, useLocation } from "react-router-dom";

import BurgerMenu from "./components/Burger";
import Home from "./pages/Home";
import FindPals from "./pages/FindPals";
import DiceRoller from "./pages/DiceRoller";
import MyPals from "./pages/MyPals";
import "./styles/index.css";
import PlayerChat from "./pages/PlayerChat";

function App() {
  const location = useLocation();

  const getCurrentPageText = () => {
    switch (location.pathname) {
      case "/":
        return "";
      case "/findPals":
        return "Find Pals";
      case "/MyPals":
        return "My Pals";
      case "/DiceRoller":
        return "Dice Roller";
      case "/adventureJournal":
        return "Adventure Journal";
      case "/characterSheets":
        return "Character Sheets";
      case "/PlayerChat":
        return "My Pals";
      default:
        return ""; // Default text if no match is found
    }
  };

  return (
    <>
      <BurgerMenu currentPageText={getCurrentPageText()} />{" "}
      {/* Pass the current page text */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FindPals" element={<FindPals />} />
        <Route path="/matches" element={<matches />} />
        {/* <Route path="/characters" element={<Characters />} /> */}
        {/* <Route path="/characters" element={<Characters />} /> */}
        <Route path="/adventureJournal" element={<adventureJournal />} />
        {/* <Route path="/CharacterSheets" element={<CharacterSheets />} /> */}
        <Route path="/DiceRoller" element={<DiceRoller />} />
        <Route path="/MyPals" element={<MyPals />} />
        <Route path="/PlayerChat" element={<PlayerChat />} />
      </Routes>
    </>
  );
}

export default App;
