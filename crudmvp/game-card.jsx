import { useNavigate } from "react-router-dom";

export default function Game({ game }) {
  // user is a prop containing user data, ex:
  // {id: "...", image: "...", mail: "...", name: "...", phone: "...", title: "..."}
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/users/${game.id}`);
  }

  // function getInitials() {
  //   const initials = user.mail?.split("@")[0]; // get the part before the @ symbol in the mail
  //   return initials;
  // }

  return (
    <article className="game-card" onClick={handleClick}>
      <img src={game.image || "https://placehold.co/600x400?text=Error+loading+image"} alt={game.difficulty} />
      <div className="game_card-title-container">
      <h2>
        {game.title} 
      </h2>
      <div className="location">
        <p> {game.location}</p>
        <img src="pin.png" alt="Location Pin" />
      </div>
      </div>
      <p className="title">{game.difficulty}</p>
      
    </article>
  );
}
