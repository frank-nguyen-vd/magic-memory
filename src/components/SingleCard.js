export default function SingleCard({ key, src, isOpened }) {
    return (
        <div className="card" key={key}>
            <div>
                {isOpened && <img className="front" src={src} alt="card front" />}
                {!isOpened && <img className="back" src="/img/cover.png" alt="card back" />}
            </div>
        </div>
    );
}
