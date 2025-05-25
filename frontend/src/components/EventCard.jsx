function EventCard ({ title , date , price , onAddToCart }) {
    return(
        <div className="event-card">
            <h3>{title}</h3>
            <p>{date}</p>
            <p>{price} ₺</p>
            {onAddToCart && (
                <button onClick={onAddToCart}>Sepete Ekle</button>
            )}
        </div>
    );
}

export default EventCard;
