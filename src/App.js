import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'


//the card images here will act as image source
//the src can be enclosed in quotation marks

const cardImages = [
  { "src": '/img/helmet-1.png', matched: false }, 
  { "src": '/img/potion-1.png', matched: false },
  { "src": '/img/ring-1.png',  matched: false },
  { "src": '/img/scroll-1.png', matched: false },
  { "src": '/img/shield-1.png', matched: false },
  { "src": '/img/sword-1.png', matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled]=useState(false)

  //to shuffle cards

  const shuffleCards = () => {
    //now we have 12 in total as the number of cards
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }       

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
//start the game automatically

useEffect(()=>{
  shuffleCards()
},[])


  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
    setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        resetTurn()
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched :true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(()=>resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  return (
    <div className='App'>
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne || card === choiceTwo || card.matched
            }
            disabled={disabled}
          />
          // note we can name the prop anything, that thing that we namde it with will be used in the component that we are exporting it too
        ))}
      </div>
          <p>Turns: {turns}</p>
    </div>
  )
}

export default App
