import '../styles/Card.css';

function Card({ pokemon, onClick }) {
  return (
    <div className="card" onClick={() => onClick(pokemon.id)}>
      <div className="card-inner">
        <div className="card-img-wrapper">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <p className="card-name">{pokemon.name}</p>
      </div>
    </div>
  );
}

export default Card;