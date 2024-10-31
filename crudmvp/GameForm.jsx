import { useEffect, useState } from "react";

export default function GameForm({ onSubmit, onCancel, game }) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [theme, setTheme] = useState("");
  const [number_of_players, setPlayers] = useState("");
  const [game_time, setPlaytime] = useState("");
  const [image, setImage] = useState("");

  const [game_type, setGametype] = useState("");
  const [game_style, setGamestyle] = useState("");
  const [language, setLanguage] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (game) {
      game.title && setTitle(game.title); // if game.title is true, set the title state with the game.title value
      game.theme && setTheme(game.theme); // if game.theme is true, set the theme state with the game.theme value
      game.difficulty && setDifficulty(game.difficulty);
      game.number_of_players && setPlayers(game.number_of_players);
      game.game_time && setPlaytime(game.game_time);
      game.image && setImage(game.image);

      game.game_type && setGametype(game.game_type);
      game.game_style && setGamestyle(game.game_style);
      game.language && setLanguage(game.language);
      game.location && setLocation(game.location);
    }
  }, [game]);

  function handleOnSubmit(event) {
    event.preventDefault();

    // validate the form
    if (
      !title ||
      !theme ||
      !difficulty ||
      !number_of_players ||
      !game_time ||
      !game_type ||
      !game_style ||
      !language ||
      !location
    ) {
      alert("Please fill out all the fields");
      return;
    } else if (!image) {
      alert("Please paste an image URL");
      return;
    } else if (!image.startsWith("http")) {
      alert("Please paste a valid image URL");
      return;
    }

    const newGame = {
      title: title,
      theme: theme,
      difficulty: difficulty,
      number_of_players: number_of_players,
      game_type: game_type,
      game_style: game_style,
      language: language,
      location: location,
      game_time: game_time,
      image: image,
    };

    onSubmit(newGame);
  }

  return (
    <>
      <form className="creatorForm" onSubmit={handleOnSubmit}>
        <div className="creatorForm_input">
          <label htmlFor="title">Set Game&apos;s Title</label>
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Input Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="creatorForm_input">
          <label htmlFor="difficulty">Set Game&apos;s Difficulty</label>
          <input
            id="difficulty"
            type="text"
            value={difficulty}
            placeholder="Input Difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </div>

        <div className="creatorForm_input">
          <label htmlFor="theme">Set Game&apos;s Theme</label>
          <input
            id="theme"
            type="text"
            value={theme}
            placeholder="Input Theme"
            onChange={(e) => setTheme(e.target.value)}
          />
        </div>

        <div className="creatorForm_input">
          <label htmlFor="players">Set Game&apos;s Player Amount</label>
          <input
            id="players"
            type="text"
            value={number_of_players}
            placeholder="Input Player Amount"
            onChange={(e) => setPlayers(e.target.value)}
          />
        </div>

        <div className="creatorForm_input">
          <label htmlFor="gametype">Set Game&apos;s Type</label>
          <input
            id="gametype"
            type="text"
            value={game_type}
            placeholder="Input Game Type"
            onChange={(e) => setGametype(e.target.value)}
          />
        </div>

        <div className="creatorForm_input">
          <label htmlFor="playtime">Set Game&apos;s Playtime</label>
          <input
            id="playtime"
            type="text"
            value={game_time}
            placeholder="Input Playtime"
            onChange={(e) => setPlaytime(e.target.value)}
          />
        </div>

        <div className="creatorForm_input">
          <label htmlFor="gamestyle">Set Game&apos;s Style</label>
          <input
            id="gamestyle"
            type="text"
            value={game_style}
            placeholder="Input Game Style"
            onChange={(e) => setGamestyle(e.target.value)}
          />
        </div>

        <div className="creatorForm_input">
          <label htmlFor="location">Set Game&apos;s Location</label>
          <input
            id="location"
            type="text"
            value={location}
            placeholder="Input Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="creatorForm_input">
          <label htmlFor="language">Set Game&apos;s Language</label>
          <input
            id="language"
            type="text"
            value={language}
            placeholder="Input Language"
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>

        <div className="creatorForm_input">
          <label htmlFor="image">Set Game&apos;s Image</label>
          <input
            type="url"
            value={image}
            placeholder="Paste Image URL"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <label htmlFor="image-preview"></label>
        <img
          id="image-preview"
          className="image-preview"
          src={image ? image : "https://placehold.co/600x400?text=Image+Preview"}
          alt="Choose"
          onError={(e) =>
            (e.target.src =
              "https://placehold.co/600x400?text=Error+loading+image")
          }
        />

        <div className="btns">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit">{game ? "Save" : "Create"}</button>
        </div>
      </form>
    </>
  );
}
