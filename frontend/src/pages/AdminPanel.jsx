/* Yeni etkinlikler eklemek icin */

//import React from 'react';
import { useState } from 'react';

function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');

  const handleAddEvent = (e) => {
    e.preventDefault();

    // Yeni etkinlik nesnesi olusturuyoruz
    const newEvent = {
      id: events.length + 1,
      title,
      date,
      price: parseInt(price), // 0 olabilir, ücretsiz etkinlik
    };

    // Eski listeye yeni etkinligi ekleyelim
    setEvents([...events, newEvent]); // newEvents olmasi gerekmez mi "s" ?

    // Formu temizliyoruz
    setTitle('');
    setDate('');
    setPrice('');
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: '#fde6a4', minHeight: '100vh' }}>
      <h2>Yeni Etkinlik Ekle</h2>

      <form onSubmit={handleAddEvent} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Etkinlik Basligi"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />

        <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        />

        <input
         type="number"
         placeholder="Fiyat (₺)"
         value={price}
         onChange={(e) => setPrice(e.target.value)}
         required
         min="0" // Ücretsiz etkinlik için 0 gir
        />

        <button type="submit">Ekle</button>
      </form>

      <h3>Eklenen Etkinlikler</h3>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title} | {event.date} | {event.price === 0 ? 'Ücretsiz' : `${event.price} ₺`} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;