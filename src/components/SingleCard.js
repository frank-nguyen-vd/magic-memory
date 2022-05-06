export default function SingleCard({ card, handleChoice, isOpened }) {
    const handleClick = () => {
        handleChoice(card);
    };

    return (
        <div className="card" key={card.id}>
            <div>
                {isOpened && <img className="front" src={card.src} alt="card front" />}
                {!isOpened && <img className="back" src="/img/cover.png" onClick={handleClick} alt="card back" />}
            </div>
        </div>
    );
}
