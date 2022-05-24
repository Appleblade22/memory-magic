import React from 'react'
import './Card.css'

export default function Card({card, src, turns, setTurns, handleChoice,flipped,disabled}) {
    const handleClick = () => {
        
        if(!disabled){
            handleChoice(card);
            setTurns(turns + 1);
        }
    }

  return (
    <div className="card">
        <div className= {flipped ? "flipped" : ""}>
            <img className = "front" src={src} alt="card front" />
            <img src="/img/cover.png" alt="" className="back" onClick={handleClick}/>
        </div>
    </div>
  )
}
