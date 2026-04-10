import { useState, useEffect } from 'react';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import './styles/index.css';

const TOTAL_CARDS = 12;

function getRandomIds(count) {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * 898) + 1);
  }
  return [...ids];
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

async function fetchPokemon(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return {
    id: data.id,
    name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
    image:
      data.sprites.other['official-artwork'].front_default ||
      data.sprites.front_default,
  };
}

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [clickedIds, setClickedIds] = useState(new Set());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    loadPokemon();
  }, []);

  async function loadPokemon() {
    setIsLoading(true);
    const ids = getRandomIds(TOTAL_CARDS);
    const results = await Promise.all(ids.map(fetchPokemon));
    setPokemonList(shuffle(results));
    setIsLoading(false);
  }

  function handleCardClick(id) {
    if (clickedIds.has(id)) {
      // Already clicked — game over
      if (score > bestScore) setBestScore(score);
      setIsWin(false);
      setGameOver(true);
      return;
    }

    const newClicked = new Set(clickedIds);
    newClicked.add(id);
    const newScore = score + 1;

    setClickedIds(newClicked);
    setScore(newScore);
    if (newScore > bestScore) setBestScore(newScore);

    if (newClicked.size === TOTAL_CARDS) {
      // Won!
      setIsWin(true);
      setGameOver(true);
      return;
    }

    setPokemonList((prev) => shuffle([...prev]));
  }

  async function handleRestart() {
    setClickedIds(new Set());
    setScore(0);
    setGameOver(false);
    setIsWin(false);
    await loadPokemon();
  }

  return (
    <div className="app">
      <Header score={score} bestScore={bestScore} />
      <main className="main">
        <p className="instructions">
          Click each Pokémon — but don't click the same one twice!
        </p>
        <GameBoard
          pokemonList={pokemonList}
          onCardClick={handleCardClick}
          isLoading={isLoading}
        />
      </main>
      {gameOver && (
        <GameOver
          score={score}
          bestScore={bestScore}
          onRestart={handleRestart}
          isWin={isWin}
        />
      )}
    </div>
  );
}

export default App;