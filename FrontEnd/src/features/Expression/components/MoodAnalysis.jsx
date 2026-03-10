import { useSong } from "../../home/hooks/useSong";
import { moodColorMap } from "../utils/moodColors";

export default function MoodAnalysis({expression}) {

  const {analyzedDetails} = useSong()

  return (
    <div style={{backgroundColor: moodColorMap[analyzedDetails?.mood]}} className="mood-analysis">
      <h2 className="mood-sec-title">Personalized Results</h2>
      <div className="mood-details">
        <img src={`/images/${analyzedDetails?.mood || "thinking"}.png`} width={100} height={100} alt="" />
        <div>
          <h2>{expression}</h2>
        </div>

      </div>

      <div  className="stats">

        <div className="card">
          <span>Mood</span>
          <h4>{analyzedDetails?.mood || "??"}</h4>
        </div>

        <div className="card">
          <span>Intensity</span>
          <h4>{Math.round(analyzedDetails?.intensity * 100) || 0}%</h4>
        </div>

        <div className="card">
          <span>Level</span>
          <h4>{analyzedDetails?.level || "??"}</h4>
        </div>

      </div>



    </div>
  );
}