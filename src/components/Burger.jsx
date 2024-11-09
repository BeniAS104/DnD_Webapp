import { useState } from 'react';
import '../styles/components/BurgerMenu.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const BurgerMenu = ({currentPageText}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header>
    <div className="burger-menu">
        <div className='navbar'>
      <div 
        className={`backdrop ${isOpen ? 'show' : ''}`}
        onClick={toggleMenu} 
      ></div>

      <div className="burger-icon" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <NavLink to="/">
      <img 
  src="/red_icon.svg" 
  alt="red dungeon pal logo" 
  style={{ marginLeft: '1rem', height: '42px' }} 
/></NavLink>
<p className='text'>{currentPageText}</p>


{currentPageText === "" ? (
          <button className="menu-button">Sign Up</button> 
        ) : (
          <img src="/placeholder_icon.svg" alt="Additional Info" style={{ height: '37px', marginLeft: 'auto' }} /> 
        )}
</div>

      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
        <li><NavLink to="/findPals" onClick={toggleMenu}><div><img src="/menu_search.svg" alt="Search icon"/><p>Find Pals</p></div></NavLink></li>
          <li className="menu-space"><NavLink to="/findPals" onClick={toggleMenu}>Discover</NavLink></li>
          <li className="menu-space"><NavLink to="/findPals?tab=matches" onClick={toggleMenu}>Matches</NavLink></li>
          </ul>
          <hr/>
          <ul>
          <li><NavLink to="/MyPals" onClick={toggleMenu}><div><img src="/menu_pals.svg" alt="Search icon"/><p>My Pals</p></div></NavLink></li>
          <li className="menu-space"><NavLink to="/MyPals" onClick={toggleMenu}>Groups</NavLink></li>
          <li className="menu-space"><NavLink to="/MyPals" onClick={toggleMenu}>Players</NavLink></li>
          </ul>
          <hr/>
          <ul>
          <li><NavLink to="/AdventureJournal" onClick={toggleMenu}><div><img src="/menu_journal.svg" alt="Journal icon"/><p>Adventure Journal</p></div></NavLink></li>
          </ul>
          <hr/>
          <ul>
          <li><NavLink to="/findPals" onClick={toggleMenu}><div><img src="/menu_sheets.svg" alt="sheets icon"/><p>Character Sheets</p></div></NavLink></li>
          </ul>
          <hr/>
          <ul>
          <li><NavLink to="/DiceRoller" onClick={toggleMenu}><div><img src="/menu_dice.svg" alt="dice icon"/><p>Dice Roller</p></div></NavLink></li>
          </ul>
          <hr/>
          <ul>
          <li><NavLink to="/Inspiration" onClick={toggleMenu}><div><img src="/menu_inspiration.svg" alt="inspiration icon"/><p>Inspiration</p></div></NavLink></li>
          </ul>
          <hr/>
          <ul>
          <li><NavLink to="/findPals" onClick={toggleMenu}><div><img src="/menu_music.svg" alt="music icon"/><p>Music</p></div></NavLink></li>
          </ul>
          <hr/>
          <ul>
          <li><NavLink to="/findPals" onClick={toggleMenu}><div><img src="/menu_ai.svg" alt="ai icon"/><p>Dungeon Pal AI</p></div></NavLink></li>
          </ul>
          <hr/>
          <ul>
          <li><NavLink to="/findPals" onClick={toggleMenu}><div><img src="/menu_themes.svg" alt="themes icon"/><p>Themes</p></div></NavLink></li>
          </ul>
          <hr/>


        <div className='menu-bottom' >
        <NavLink to="/" onClick={toggleMenu}><div><img src="/soil_icon.svg" alt="dungeon pal icon" /><p>About Dungeon Pal</p></div></NavLink>
            <a href="#"><div><img src="/menu_help.svg" alt="help icon" /><p>Help</p></div></a>
        </div>
      </nav>
    </div>
    </header>
  );
};
BurgerMenu.propTypes = {
    currentPageText: PropTypes.string.isRequired, }

export default BurgerMenu;
