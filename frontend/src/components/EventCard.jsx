{/* Sepet bileseni */}
function EventCard ({ title , date , price , onAddToCart }) {
    return(
        <div style={{  
 
            border: '1px solid #ccc',
            padding: '1rem',
            margin: '1rem 0' ,
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
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
