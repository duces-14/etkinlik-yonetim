{/* Etkinlik Listemiz */}

// import { useContext, useState } from 'react'; alttakini backend sonrasi ekledigimizden bu satiri yoruma cektim
import { useContext, useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';  // Sayfalar arasi gecis icin
import { Link, useNavigate } from 'react-router-dom';
//import events from '/Users/VICTUS-14/Web_Project/frontend/src/data/events.js';  // Etkinlik verilerimizi aldık
import { EventContext } from '@/context/EventContext';
import EventCard from '@/components/EventCard.jsx';  // Kart bileşenini çağırdık




function MainPage( { onAddToCart }){  
    const navigate = useNavigate(); // 👈 Bu satır eksikti
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
            <h1>Etkinlik Listesi</h1>

            {showMessage && (
                <p style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '0.5rem 1rem',
                    border: '1px solid #c3e6cb',
                    borderRadius: '4px',
                    marginBottom: '1rem',
                }}>
                    Etkinlik sepete eklendi !
                </p>
            )}

            <Link to="/cart">
            <button style={{
                marginBottom: '1rem',
                backgroundColor: '#007bff',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>
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
        </div>
    );
}
export default MainPage;

{/* import Oncelik sırasi:
    Profesyonel projelerde genelde şu sıralama önerilir:
1.React ve kütüphaneler
    import React from 'react';
    import { useState } from 'react';

2.Üçüncü parti modüller
    import axios from 'axios';
    import moment from 'moment';

3.Proje içi dosyalar (component, page, style vs.)
    import MainPage from './pages/MainPage.jsx';
    import './index.css';

Bu düzen, örnek değil standarttır. ESLint + Prettier gibi araçlar da bunu otomatik olarak uygular.
    
    | Soru                                   | Cevap                                                                             |
| -------------------------------------- | --------------------------------------------------------------------------------- |
| `import` en başta olmak zorunda mı?    | **Evet**. Aksi takdirde hem sözdizimi hatası alırsın hem de `undefined` hataları. |
| Ortada/altta yazılabilir mi?           | **Hayır**, JavaScript modül sistemi buna izin vermez.                             |
| Uygulama içi kullanımda etkisi var mı? | **Evet**, bileşenleri doğru sırada import etmezsen uygulama çöker.                |
    
    */}

