import { useSong } from "../hooks/useSong";
import "../styles/recommendations.scss";

export default function Recommendations() {


  const {recommendations, setSong} = useSong()

  const handleSong = (song)=>{
    console.log(song)
    setSong(song)
  }

  return (
    <div className="recommendations">

      <h2>Mood-Based Recommendations</h2>

      <div className="grid">

        {recommendations?.map((p, i) => (
          <div onClick={()=>handleSong(p)} className="card" key={i}>

            <div className="cover">
              <img style={{width: "100%", height: "100%", objectFit: "contain"}} src={p.posterUrl} alt="" />
            </div>

            <h4>{p.title}</h4>

          </div>
        ))}

      </div>

    </div>
  );
}