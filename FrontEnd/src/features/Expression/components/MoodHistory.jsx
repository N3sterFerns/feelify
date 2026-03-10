import React from 'react';
import "../styles/moodhistory.scss";
import { useSong } from '../../home/hooks/useSong';

const MoodHistory = () => {
  const historyItems = [
    {
      mood: "Focused 🧘",
      time: "10:45 AM",
      day: "Today",
      song: "Stardust Echoes",
      type: "focused"
    },
    {
      mood: "Energetic 🔥",
      time: "09:15 AM",
      day: "Today",
      song: "Cyber Vibe",
      type: "energetic"
    },
    {
      mood: "Chill 😊",
      time: "08:30 PM",
      day: "Yesterday",
      song: "Chill Beats",
      type: "chill"
    }
  ];

  const { moodHistory, clearMoods } = useSong()
  return (
    <div className="mood-history">
      <div className="h-header">
        <h2>
          <span className="material-symbols-outlined icon">history</span>
          Mood History
        </h2>
        <button onClick={clearMoods} className="clear-btn">Clear</button>
      </div>

      <div className="history-list">
        {moodHistory?.map((item, index) => (
          <div key={index} className={`history-item ${item?.type}`}>
            <div className="dot"></div>

            <div className="h-content">
              <div className="top">
                <div>
                  <p className="mood">{item?.emotion}</p>
                  <p className="time">{new Date(item?.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</p>
                  <p className="day">{item?.dayofWeek}</p>
                </div>
              </div>

              <div className="song">
                <span className="material-symbols-outlined">music_note</span>
                <span className="title">{item?.song?.title.slice(0, 30)}...</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodHistory;