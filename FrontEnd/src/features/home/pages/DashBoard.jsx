import { useState } from "react";

import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import MoodDetection from "../../Expression/components/MoodDetection";
import MoodAnalysis from "../../Expression/components/MoodAnalysis";
import Recommendations from "../components/Recommendations";
import Player from "../components/Player";

import "../styles/dashboard.scss";
import { useSong } from "../hooks/useSong";
import MoodHistory from "../../Expression/components/MoodHistory";
import MoodGraph from "../../Expression/components/MoodGraph";

export default function Dashboard() {

  const [open, setOpen] = useState(false);
  
  const { handleGetSong, setExpression,expression } = useSong();


  return (
    <div className="container">

      <Sidebar open={open} setOpen={setOpen} />

      <main className="main">

        <Header setOpen={setOpen} />

        <div className="content">

          <div className="mood-section">

            <MoodDetection setExpression={setExpression} onClick={({emotion, intensity, level})=> handleGetSong({emotion, intensity, level})} />

            <MoodAnalysis expression={expression} />
            <MoodHistory/>
            <MoodGraph/>

          </div>

          <Recommendations />

        </div>
          <Player />


      </main>

    </div>
  );
}