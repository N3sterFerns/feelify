import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import Navbar from '../components/Navbar'
import "../styles/home.scss"

const Home = () => {
  const { handleGetSong } = useSong();

  return (
    <div className='main-home-container'>
      <Navbar />
      <div className='face-express-section'>
        <div className='face-expression-con'>
          <div className="face-details">
            <div className='details'>
              <h1>Scan your Expression</h1>
              <p>Our AI analyzes your facial micri-expressions to create the perfect music for your current mood.</p>
            </div>
          </div>
          <div>
            <FaceExpression onClick={({expression})=> handleGetSong(expression)}/>
          </div>
        </div>
      </div>

      <Player />
    </div>
  )
}

export default Home