import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

const cardImages = [
    { src: "/img/helmet-1.png", matched: false },
    { src: "/img/potion-1.png", matched: false },
    { src: "/img/ring-1.png", matched: false },
    { src: "/img/scroll-1.png", matched: false },
    { src: "/img/shield-1.png", matched: false },
    { src: "/img/sword-1.png", matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);

    // shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));
        setCards(shuffledCards);
    };

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    // compare 2 selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => (card.src === choiceOne.src ? { ...card, matched: true } : card));
                });
            }
            setTimeout(() => resetTurn(), 500);
        }
    }, [choiceOne, choiceTwo]);

    const resetTurn = () => {
        setDisabled(false);
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
    };

    // start a new game automatically
    useEffect(() => {
        shuffleCards();
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
    }, []);

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>

            <div className="card-grid">
                {cards.map((card) => (
                    <SingleCard
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
            <p>Turns: {turns}</p>
        </div>
    );
}

export default App;
