import { useState } from "react";

import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import MoodDetection from "../components/MoodDetection";
import MoodAnalysis from "../components/MoodAnalysis";
import Recommendations from "../components/Recommendations";
import Player from "../components/Player";

import "../styles/dashboard.scss";
import { useSong } from "../hooks/useSong";

export default function Dashboard() {

  const [open, setOpen] = useState(false);
  const { handleGetSong } = useSong();


  return (
    <div className="container">

      <Sidebar open={open} setOpen={setOpen} />

      <main className="main">

        <Header setOpen={setOpen} />

        <div className="content">

          <div className="mood-section">

            <MoodDetection onClick={({expression})=> handleGetSong(expression)} />

            <MoodAnalysis />

          </div>

          <Recommendations />

        </div>
          <Player />


      </main>

    </div>
  );
}