import '../styles/GameOver.css';

function GameOver({ score, bestScore, onRestart, isWin }) {
  return (
    <div className="gameover-overlay">
      <div className="gameover-box">
        <p className="gameover-icon">{isWin ? '🏆' : '💥'}</p>
        <h2 className="gameover-title">{isWin ? 'You Won!' : 'Got You!'}</h2>
        <p className="gameover-sub">
          {isWin
            ? 'You clicked every Pokémon exactly once!'
            : 'You clicked the same Pokémon twice.'}
        </p>
        <div className="gameover-scores">
          <div className="go-score-block">
            <span className="go-label">Score</span>
            <span className="go-value">{score}</span>
          </div>
          <div className="go-score-block">
            <span className="go-label">Best</span>
            <span className="go-value gold">{bestScore}</span>
          </div>
        </div>
        <button className="restart-btn" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameOver;