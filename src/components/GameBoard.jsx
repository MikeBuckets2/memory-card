import Card from './Card';
import '../styles/GameBoard.css';

function GameBoard({ pokemonList, onCardClick, isLoading }) {
  if (isLoading) {
    return (
      <div className="loading-wrapper">
        <div className="pokeball-spinner"></div>
        <p className="loading-text">Loading Pokémon...</p>
      </div>
    );
  }

  return (
    <div className="gameboard">
      {pokemonList.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} onClick={onCardClick} />
      ))}
    </div>
  );
}

export default GameBoard;