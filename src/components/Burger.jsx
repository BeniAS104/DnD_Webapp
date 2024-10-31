import { useState } from 'react';
import '../styles/components/BurgerMenu.css';
import PropTypes from 'prop-types';

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
      <img 
  src="red_icon.svg" 
  alt="red dungeon pal logo" 
  style={{ marginLeft: '1rem', height: '42px' }} 
/>
<p className='text'>{currentPageText}</p>


{currentPageText === "" ? (
          <button className="menu-button">Sign Up</button> // Button for Home page
        ) : (
          <img src="/placeholder_icon.svg" alt="Additional Info" style={{ height: '37px', marginLeft: 'auto' }} /> // Image for other pages
        )}
</div>

      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#home"><div><img src="/menu_search.svg" alt="Search icon"/><p>Find Pals</p></div></a></li>
          <li className="menu-space"><a href="#about">Discover</a></li>
          <li className="menu-space"><a href="#services">Matches</a></li>
          </ul>
          <hr/>
          <ul>
          <li><a href="#home"><div><img src="/menu_pals.svg" alt="Search icon"/><p>My Pals</p></div></a></li>
          <li className="menu-space"><a href="#about">Players</a></li>
          <li className="menu-space"><a href="#services">Groups</a></li>
          </ul>
          <hr/>
          <ul>
          <li><a href="#home"><div><img src="/menu_journal.svg" alt="Journal icon"/><p>Adventure Journal</p></div></a></li>
          </ul>
          <hr/>
          <ul>
          <li><a href="#home"><div><img src="/menu_sheets.svg" alt="sheets icon"/><p>Character Sheets</p></div></a></li>
          </ul>
          <hr/>
          <ul>
          <li><a href="#home"><div><img src="/menu_dice.svg" alt="dice icon"/><p>Dice Roller</p></div></a></li>
          </ul>
          <hr/>
          <ul>
          <li><a href="#home"><div><img src="/menu_inspiration.svg" alt="inspiration icon"/><p>Inspiration</p></div></a></li>
          </ul>
          <hr/>
          <ul>
          <li><a href="#home"><div><img src="/menu_music.svg" alt="music icon"/><p>Music</p></div></a></li>
          </ul>
          <hr/>
          <ul>
          <li><a href="#home"><div><img src="/menu_ai.svg" alt="ai icon"/><p>Dungeon Pal AI</p></div></a></li>
          </ul>
          <hr/>
          <ul>
          <li><a href="#home"><div><img src="/menu_themes.svg" alt="themes icon"/><p>Themes</p></div></a></li>
          </ul>
          <hr/>


        <div className='menu-bottom' >
            <a href="#"><div><img src="/soil_icon.svg" alt="dungeon pal icon" /><p>About Dungeon Pal</p></div></a>
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
