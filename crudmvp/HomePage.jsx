import { useEffect, useState } from "react";
import Game from "../components/Game";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");
  const [filterTheme, setFilterTheme] = useState("");
  const [filterGametype, setFilterGametype] = useState("");
  const [filterGamestyle, setFilterGamestyle] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterPlaytime, setFilterPlaytime] = useState("");
  const [filterPlayers, setFilterPlayers] = useState("");

  useEffect(() => {
    getGames();

    async function getGames() {
      const data = localStorage.getItem("games");
      if (data) {
        setGames(JSON.parse(data));
      } else {
        const gamesData = await fetchGames();
        setGames(gamesData);
      }
    }
  }, []);

  async function fetchGames() {
    const response = await fetch(
      "https://raw.githubusercontent.com/BeniAS104/CRUD_MVP_PROJECT/main/data.json"
    );
    const data = await response.json();
    localStorage.setItem("games", JSON.stringify(data));
    return data;
  }

  const difficulties = [...new Set(games.map((game) => game.difficulty))];
  const themes = [...new Set(games.map((game) => game.theme))];
  const gametypes = [...new Set(games.map((game) => game.game_type))];
  const gamestyles = [...new Set(games.map((game) => game.game_style))];
  const locations = [...new Set(games.map((game) => game.location))];
  const languages = [...new Set(games.map((game) => game.language))];
  const playtimes = [...new Set(games.map((game) => game.game_time))];
  const players = [...new Set(games.map((game) => game.number_of_players))];

  let filteredGames = games
  .filter((game) => {
    return (
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterDifficulty === "" || game.difficulty === filterDifficulty) &&
      (filterTheme === "" || game.theme === filterTheme) &&
      (filterGametype === "" || game.game_type === filterGametype) &&
      (filterGamestyle === "" || game.game_style === filterGamestyle) &&
      (filterLocation === "" || game.location === filterLocation) &&
      (filterLanguage === "" || game.language === filterLanguage) &&
      (filterPlaytime === "" || game.game_time === filterPlaytime) &&
      (filterPlayers === "" || game.number_of_players === filterPlayers)
    );
  })
  .sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title

  

  return (
    <section className="page">
      <div className="content_container">
      <div className="search_bar">
        <label>
          Search by Game Name
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      <form className="grid-filter">
        <label>
          Filter by Difficulty
          <select onChange={(e) => setFilterDifficulty(e.target.value)}>
            <option value="">All Difficulties</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Theme
          <select onChange={(e) => setFilterTheme(e.target.value)}>
            <option value="">All Themes</option>
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Game Type
          <select onChange={(e) => setFilterGametype(e.target.value)}>
            <option value="">All Game Types</option>
            {gametypes.map((gametype) => (
              <option key={gametype} value={gametype}>
                {gametype}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Game Style
          <select onChange={(e) => setFilterGamestyle(e.target.value)}>
            <option value="">All Game Styles</option>
            {gamestyles.map((gamestyle) => (
              <option key={gamestyle} value={gamestyle}>
                {gamestyle}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Location
          <select onChange={(e) => setFilterLocation(e.target.value)}>
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Language
          <select onChange={(e) => setFilterLanguage(e.target.value)}>
            <option value="">All Languages</option>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Playtime
          <select onChange={(e) => setFilterPlaytime(e.target.value)}>
            <option value="">All Playtimes</option>
            {playtimes.map((playtime) => (
              <option key={playtime} value={playtime}>
                {playtime}
              </option>
            ))}
          </select>
        </label>

        <label>
          Filter by Number of Players
          <select onChange={(e) => setFilterPlayers(e.target.value)}>
            <option value="">All Player Counts</option>
            {players.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        </label>
      </form>
      </div>

      <section className="grid">
        {filteredGames.map((game) => (
          <Game game={game} key={game.id} />
        ))}
      </section>
    </section>
  );
}
