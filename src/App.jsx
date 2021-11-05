import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImgs = [
  { src: '/img/cow.jpg', matched: false },
  { src: '/img/frog.jpg', matched: false },
  { src: '/img/lion.jpg', matched: false },
  { src: '/img/horse.jpg', matched: false },
  { src: '/img/kitten.jpg', matched: false },
  { src: '/img/ladybug.jpg', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [cardOne, setCardOne] = useState(null);
  const [cardTwo, setCardTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImgs, ...cardImgs]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  };

  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true);
      if (cardOne.src === cardTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === cardOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        console.log("Wrong! The cards don't match.");
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [cardOne, cardTwo]);

  const resetTurn = () => {
    setCardOne(null);
    setCardTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
    setCardOne(null);
    setCardTwo(null);
  }, []);

  return (
    <div className="App">
      <h1>The Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === cardOne || card === cardTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
