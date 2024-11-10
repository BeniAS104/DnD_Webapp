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
import Characters from "./pages/CharacterSheets";


// This is the main App function where the routing logic happens
function App() {
  // The useLocation hook gives us access to the current URL path
  const location = useLocation();

  // This function determines which page text to display in the BurgerMenu based on the current path
  const getCurrentPageText = () => {
    // Check if the user is on the Home page ("/"), return an empty string for no text
    if (location.pathname === "/") return "";

    // Check for specific paths and return the appropriate page title
    if (location.pathname === "/findPals") return "Find Pals";
    if (location.pathname === "/MyPals") return "My Pals";
    if (location.pathname === "/DiceRoller") return "Dice Roller";
    
    // If the path is related to Adventure Journal (could be a deeper path like /AdventureJournal/some-id)
    if (location.pathname.startsWith("/AdventureJournal")) return "Adventure Journal";
    
    // Check other paths and return the corresponding page title
    if (location.pathname === "/characterSheets") return "Character Sheets";
    if (location.pathname === "/PlayerChat") return "My Pals";  // Same title as 'My Pals' page
    if (location.pathname === "/Inspiration") return "Inspiration";

    // Default case if no specific path matches
    return ""; 
  };

  return (
    <>
      {/* Render the BurgerMenu component and pass the current page title */}
      <BurgerMenu currentPageText={getCurrentPageText()} />{" "} 

      {/* Define the different routes for different pages */}
      <Routes>
        {/* Define each route and associate it with the corresponding component */}
        <Route path="/" element={<Home />} /> 
        <Route path="/FindPals" element={<FindPals />} />  
        <Route path="/AdventureJournal/*" element={<AdventureJournal />} />  {/* Adventure Journal page, wildcard * to catch all sub-paths */}
        <Route path="/DiceRoller" element={<DiceRoller />} />  
        <Route path="/MyPals" element={<MyPals />} />  
        <Route path="/CharacterSheets" element={<Characters />} />  
        <Route path="/PlayerChat" element={<PlayerChat />} />  
        <Route path="/Inspiration" element={<Inspiration />} />  
      </Routes>
    </>
  );
}

export default App;