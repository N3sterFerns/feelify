import "../styles/recommendations.scss";

export default function Recommendations() {

  const playlists = [
    { title: "Chill Beats", desc: "Perfect for Focus" },
    { title: "Focus Flow", desc: "Deep Concentration" },
    { title: "Stardust Echoes", desc: "Celestial Melodies" },
    { title: "Midnight Rain", desc: "Ambient Sounds" },
    { title: "Cyber Vibe", desc: "Electric Energy" },
    { title: "Zen Mode", desc: "Ultimate Peace" }
  ];

  return (
    <div className="recommendations">

      <h2>Mood-Based Recommendations</h2>

      <div className="grid">

        {playlists.map((p, i) => (
          <div className="card" key={i}>

            <div className="cover"></div>

            <h4>{p.title}</h4>

            <p>{p.desc}</p>

          </div>
        ))}

      </div>

    </div>
  );
}