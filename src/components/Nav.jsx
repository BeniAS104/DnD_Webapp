import { NavLink } from "react-router-dom";
import "../styles/components/Nav.css";

export default function Nav() {
    return (
        <nav>
            <div className="nav-logo">
                {/* <img src={logo} alt="Dungeon Pal Logo" className="logo" /> */}
                <span className="brand-name">Dungeon Pal</span>
            </div>
            <div className="nav-links">
                <NavLink to="/" end className={({ isActive }) => (isActive ? "active-link" : "")}>Home</NavLink>
                <NavLink to="/characters" className={({ isActive }) => (isActive ? "active-link" : "")}>Characters</NavLink>
                <NavLink to="/campaigns" className={({ isActive }) => (isActive ? "active-link" : "")}>Campaigns</NavLink>
                <NavLink to="/dice-roller" className={({ isActive }) => (isActive ? "active-link" : "")}>Dice Roller</NavLink>
            </div>
        </nav>
    );
}
