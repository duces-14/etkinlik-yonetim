import '../styles/main.css';
import "@/styles/cart-notice.css";

// import { useContext, useState } from 'react'; alttakini backend sonrasi ekledigimizden bu satiri yoruma cektim
import { useContext, useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';  // Sayfalar arasi gecis icin
import { Link, useNavigate } from 'react-router-dom';
//import events from '/Users/VICTUS-14/Web_Project/frontend/src/data/events.js';  // Etkinlik verilerimizi aldık -mock veride kullanmistim
import { EventContext } from '@/context/EventContext';
import EventCard from '@/components/EventCard.jsx';  // Cart bileşenini çağırdık




function MainPage( { onAddToCart }){  
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const { events, setEvents } = useContext(EventContext);    // Etkinlik verisini kullanmazsan silik cikar tabi import ifaden !

    // Erisim korumasi ekliyorum:
    useEffect(() =>{
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/");  // login'e attım.
        }
    }, []);


    useEffect(() => {
        fetch('http://localhost:3001/events')
        .then((res) => res.json())
        .then((data) => setEvents(data))
        .catch((err) => console.error('Veri cekme hatasi: ', err));
    }, []); // sondaki [koseli parantez] bu kodun yalnızca 1 kez calismasini saglar. Yani bilesen ekrana ilk defa yuklendiginde (mount edildiginde) çalisir, sonra asla tekrar etmez.
    /*
    useEffect() fonksiyonunun ikinci parametresi, bir "bağımlılık listesi (dependency array)"’dir.
    Yani şu yapı:
    --------------------------------------------------------
    useEffect(() => {
        // yapılacak şey
    }, [BURAYA_NE_YAZARSAN_O_DEĞİŞİNCE_TEKRAR_ÇALIŞIR]);
    --------------------------------------------------------
    */



    const handleAddToCart = (event) => {
        onAddToCart(event); // Sepete ekle
        setShowMessage(true);   // Mesaji göster
        setTimeout(() => {
            setShowMessage(false);  // 2 saniye sonra gizle  
        }, 2000);
    };

    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    return(
        <div>
            <h2 className="split-title">
                SEÇİMİN
                <span>SEÇİMİN</span>
                <span>SEÇİMİN</span>
                <span>SENİ TANIMLAR</span>
            </h2>


            {showMessage && (
                <div className="cart-notice">
                    ✔ Etkinlik sepete eklendi!
                </div>
            )}

            <Link to="/cart">
            <button className="sepeti-gor-button">
                Sepeti Gör
            </button>
            </Link>

            {sortedEvents.map((event , index) =>(
                <EventCard
                key={index}
                title={event.title}
                date={event.date}
                price={event.price}
                onAddToCart={() => handleAddToCart(event)}
                // onAddToCart={() => onAddToCart(event)} : Burada sepete ekleme işlemi gerçekleşiyordu , handleAddToCart'a gecirdik 
                />
            ))}
            <p className="subtle-quote">Seçtiklerin kadar seçmediklerin de kim olduğunu belirler.</p>
        </div>
       
    );
}
export default MainPage;

