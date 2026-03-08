export default function MoodAnalysis() {

  return (
    <div className="mood-analysis">
      <h2 className="mood-sec-title">Personalized Results</h2>
      <div className="mood-details">
        <img src="/images/happy.png" width={100} height={100} alt="" />
        <div>
          <h2>Calm & Focused</h2>
          {/* <p>We've detected a high state of concentration (92%).</p> */}

        </div>

      </div>

      <div className="stats">

        <div className="card">
          <span>Intensity</span>
          <h4>Low</h4>
        </div>

        <div className="card">
          <span>Heart Rate</span>
          <h4>72 BPM</h4>
        </div>

        <div className="card">
          <span>Confidence</span>
          <h4>98%</h4>
        </div>

      </div>



    </div>
  );
}