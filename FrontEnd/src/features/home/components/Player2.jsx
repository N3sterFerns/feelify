import "../styles/player.scss";

export default function Player2() {

  return (
    <footer className="player">

      <div className="track">

        <img src="https://picsum.photos/100" />

        <div>
          <h4>Stardust Echoes</h4>
          <p>Lumina Flux</p>
        </div>

      </div>

      <div className="controls">

        <button>⏮</button>
        <button className="play">▶</button>
        <button>⏭</button>

      </div>

      <div className="volume">

        <span>🔊</span>

        <input type="range"/>

      </div>

    </footer>
  );
}