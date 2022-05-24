import './App.css'
import React, {useEffect, useState} from 'react'
import Card from './components/Card'
const cardImages = [
  {'src': "/img/helmet-1.png", matched: false},
  {'src': "/img/potion-1.png", matched: false},
  {'src': "/img/ring-1.png", matched: false},
  {'src': "/img/scroll-1.png", matched: false},
  {'src': "/img/shield-1.png", matched: false},
  {'src': "/img/sword-1.png", matched: false},
]
function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    shuffleCards();
  }, [])
  //Shuffle cards 
  const shuffleCards = () =>{
    const shuffledCards =[...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  //Handle Choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  //Reset turns
  const resetTurn = () => {
    setTurns(prev => prev+1);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  }

  // Compare two cards
  useEffect (() => {
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prev =>{
          return prev.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }
            return card;
            })
        })

        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick = {shuffleCards}>New Game</button>
      <div className="card-grid">
        {
          cards.map((card, index) => (
            <React.Fragment key={index}>
            <Card
              card={card}
              src={card.src}
              turns={turns}
              setTurns={setTurns}
              handleChoice={handleChoice}
              flipped={card.matched || card === choiceOne || card === choiceTwo}
              disabled={disabled}
            />
            </React.Fragment>
          ))
        }
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App