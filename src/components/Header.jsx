import '../styles/Header.css';

function Header({ score, bestScore }) {
  return (
    <header className="header">
      <div className="header-title">
        <span className="title-poke">Poké</span>
        <span className="title-memory">Memory</span>
      </div>
      <div className="scoreboard">
        <div className="score-block">
          <span className="score-label">Score</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="score-divider" />
        <div className="score-block">
          <span className="score-label">Best</span>
          <span className="score-value best">{bestScore}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;