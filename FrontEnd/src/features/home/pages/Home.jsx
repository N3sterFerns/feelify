import React from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'
import Navbar from '../components/Navbar'

const Home = () => {
    const {handleGetSong} = useSong();

  return (
    <div style={{position: "relative"}}>
        
        <FaceExpression onClick={({expression})=> handleGetSong(expression)}/>
        <Player/>
    </div>
  )
}

export default Home