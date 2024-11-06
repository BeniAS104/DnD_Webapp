import "../styles/Home.css"; // Make sure to create and style this CSS file

const Home = () => {
  return (
    <div className="landing-page">
      <main className="main-content">
        <img src="d20-icon.png" alt="D20 Icon" className="d20-icon" />
        <h1 className="app-name">DUNGEON PAL</h1>
        <p className="tagline">The Ultimate D&D Companion</p>

        <p className="description">
          Find groups, manage campaigns. Whether youre just starting out or a
          D&D pro, our app makes it easy to connect, play, and explore advanced
          tools, all while being part of an awesome community.
        </p>

        <div className="button-group">
          <button className="main-signup-button">Sign Up</button>
          <button className="login-button">Log In</button>
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
            <button className="main-signup-button">Sign Up</button>
            <button className="login-button">Log In</button>
          </div>
        </section>
      </main>

      <footer className="footer-home">
        <div className="footer-content">
          <h3 className="footer-brand">DUNGEON PAL</h3>
          <div className="contact-info">
            <p>Email: dungeonpal@contact.com</p>
            <p>Join our Discord</p>
          </div>
          <p className="copyright">© 2024 Dungeon Pal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
