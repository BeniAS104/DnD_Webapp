import "../styles/Home.css";

const Home = () => {
  return (
    <div className="landing-page">
      <main className="main-content">
        <img src="logo.svg" alt="Dungeon Pal Logo" className="logo" />
        <h1 className="app-name">DUNGEON PAL</h1>
        <p className="tagline">The Ultimate D&D Companion</p>

        <p className="description">
          Find groups, manage campaigns. Whether youre just starting out or a
          D&D pro, our app makes it easy to connect, play, and explore advanced
          tools, all while being part of an awesome community.
        </p>

        <div className="button-group">
          <button className="main-signup-button">Sign Up</button>
          <button className="main-login-button">Log In</button>
        </div>

        <section className="features">
          <h2>Find Players & Groups</h2>
          <p>
            Instantly connect with local or global players to form the perfect
            party for your next campaign.
          </p>

          <h2>Manage Your Campaigns</h2>
          <p>
            Keep track of notes, maps, and characters with our intuitive
            campaign management tools.
          </p>

          <h2>Discover Custom Content</h2>
          <p>
            Explore original homebrew ideas, maps, and characters shared by
            fellow players.
          </p>

          <h2>Set the Mood with Music</h2>
          <p>
            Access exclusive, D&D-inspired music playlists to bring atmosphere
            and immersion to your campaign sessions.
          </p>
        </section>

        <section className="cta-section">
          <h2 className="cta-text">READY TO JOIN THE ADVENTURE?</h2>
          <p className="cta-subtext">Create Your Account Today!</p>
          <div className="cta-buttons">
            <button className="signup-button">Sign Up</button>
            <button className="login-button">Log In</button>
          </div>
        </section>
      </main>

      <footer className="footer-home">
        <div className="footer-brand-container">
          <img src="red_icon.svg" alt="Dungeon Pal Logo Red" />
          <h3 className="footer-brand">DUNGEON PAL</h3>
        </div>
        <div className="contact-info">
          <h4>Contact</h4>
          <div className="contact-info-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="21"
              viewBox="0 0 26 21"
              fill="none"
            >
              <path
                d="M26 0H0V21H26V0ZM23.4 5.25L13 11.8125L2.6 5.25V2.625L13 9.1875L23.4 2.625V5.25Z"
                fill="#190703"
              />
            </svg>
            <p>dungeonpal@contact.com</p>
          </div>
          <div className="contact-info-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M25.6933 7.10683C23.92 6.28016 22 5.68016 20 5.3335C19.9648 5.334 19.9313 5.34837 19.9067 5.3735C19.6667 5.8135 19.3867 6.38683 19.2 6.82683C17.0786 6.50703 14.9213 6.50703 12.8 6.82683C12.6133 6.3735 12.3333 5.8135 12.08 5.3735C12.0667 5.34683 12.0267 5.3335 11.9867 5.3335C9.98666 5.68016 8.07999 6.28016 6.29333 7.10683C6.27999 7.10683 6.26666 7.12016 6.25333 7.1335C2.62666 12.5602 1.62666 17.8402 2.11999 23.0668C2.11999 23.0935 2.13333 23.1202 2.15999 23.1335C4.55999 24.8935 6.86666 25.9602 9.14666 26.6668C9.18666 26.6802 9.22666 26.6668 9.23999 26.6402C9.77333 25.9068 10.2533 25.1335 10.6667 24.3202C10.6933 24.2668 10.6667 24.2135 10.6133 24.2002C9.85333 23.9068 9.13333 23.5602 8.42666 23.1602C8.37333 23.1335 8.37333 23.0535 8.41333 23.0135C8.55999 22.9068 8.70666 22.7868 8.85333 22.6802C8.87999 22.6535 8.91999 22.6535 8.94666 22.6668C13.5333 24.7602 18.48 24.7602 23.0133 22.6668C23.04 22.6535 23.08 22.6535 23.1067 22.6802C23.2533 22.8002 23.4 22.9068 23.5467 23.0268C23.6 23.0668 23.6 23.1468 23.5333 23.1735C22.84 23.5868 22.1067 23.9202 21.3467 24.2135C21.2933 24.2268 21.28 24.2935 21.2933 24.3335C21.72 25.1468 22.2 25.9202 22.72 26.6535C22.76 26.6668 22.8 26.6802 22.84 26.6668C25.1333 25.9602 27.44 24.8935 29.84 23.1335C29.8667 23.1202 29.88 23.0935 29.88 23.0668C30.4667 17.0268 28.9067 11.7868 25.7467 7.1335C25.7333 7.12016 25.72 7.10683 25.6933 7.10683ZM11.36 19.8802C9.98666 19.8802 8.83999 18.6135 8.83999 17.0535C8.83999 15.4935 9.95999 14.2268 11.36 14.2268C12.7733 14.2268 13.8933 15.5068 13.88 17.0535C13.88 18.6135 12.76 19.8802 11.36 19.8802ZM20.6533 19.8802C19.28 19.8802 18.1333 18.6135 18.1333 17.0535C18.1333 15.4935 19.2533 14.2268 20.6533 14.2268C22.0667 14.2268 23.1867 15.5068 23.1733 17.0535C23.1733 18.6135 22.0667 19.8802 20.6533 19.8802Z"
                fill="#190703"
              />
            </svg>
            <p>Join our Discord</p>
          </div>
        </div>
        <p className="copyright">© 2024 Dungeon Pal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
