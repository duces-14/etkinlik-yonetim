/* Yeni etkinlikler eklemek icin */

//import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { EventContext } from '@/context/EventContext'; // Context baglantisini ekledik

import EditInlineForm from '@/components/EditInlineForm';


function AdminPanel() {
  const { events, setEvents, fetchEvents } = useContext(EventContext); // Context verisini aldim.
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [users, setUsers] = useState([]); // parantezin icinde neden [] var ? ve bos ?

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3001/auth/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Kullanicilari cekme hatasi:" , err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/auth/approve/${id}`, {
        method: "PUT",
      });

      if (res.ok) {
        fetchUsers(); // Listeyi guncelle
      } else {
        console.error("Sunucu onaylanmadi:", await res.text());
      }
    } catch (err) {
      console.error("Onaylama hatasi:", err);
    }
  };





  const handleAddEvent = async (e) => {
    e.preventDefault(); // Sayfanin yenilenmesini, yani varsayilan submit davranisini engelle

    const parsedPrice = parseInt(price);
    if (isNaN(parsedPrice)) {
      alert("Gecerli bir fiyat giriniz");
      return;
    }


    // Yeni etkinlik nesnesi olusturuyoruz
    const newEvent = {
      // id: events.length + 1,
      title,
      date,
      price: parseInt(price), // 0 olabilir, ücretsiz etkinlik
    };

    // Eski listeye yeni etkinligi ekleyelim
    //setEvents([...events, newEvent]); // Context'e ekledik

    try {
      // Sunucuya POST istegi gönderelim
      await fetch('http://localhost:3001/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      // Sunucudan guncel verileri alalim.
      fetchEvents();  // main sayfasini gunceller mi?
    } catch (error) {
      console.error("Etkinlik eklenemedi:", error);
    }

    // Formu temizliyoruz
    setTitle('');
    setDate('');
    setPrice('');
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/events/${id}`, {
        method: 'DELETE',
      });

      fetchEvents(); // Listeyi sunucudan tekrar cek.
    } catch (error) {
      console.error("Etkinlik silinemedi:", error);  // "" ile ' hangi durumlarda fark etmezdi ??
    }
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

        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          Ekle
        </button>

      </form>

      <h3>Eklenen Etkinlikler</h3>

      <ul>
        {events.map((event) => (
          <li key={event.id} style={{
            backgroundColor: '#fffbe6',
            padding: '0.75rem',
            marginBottom: '0.5rem',
            borderRadius: '6px',
            boxShadow: '0 10px 4px rgba(0,0,0,0.1)',
            listStyle: 'none',
          }}>
            {editingId === event.id ? (
              <EditInlineForm
              event={event}
              onCancel={() => setEditingId(null)}
              onUpdate={fetchEvents}
              />
            ) : (
              <>
                {event.title} | {event.date} | {event.price === 0 ? 'Ücretsiz' : `${event.price} ₺`}
                <button
                  onClick={() => setEditingId(event.id)}
                  style={{
                    marginLeft: '1rem',
                    paddind: '0.3rem 06.rem',
                    backgroundColor: '#ffc107',
                    color: 'black',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  style={{
                    marginLeft: '0.5rem',
                    padding: '0.3rem 0.6rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Sil 
                </button>
              </>
            )}

          {/*
            <div style={{ display: 'none '}}>
              PUT SONRASI YORUMA ALDIM - SIL butonu 
              <button
                onClick={() => handleDelete(event.id)}
                style={{
                  marginLeft: '1rem',
                  padding: '0.3rem 0.6rem',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Sil
              </button>
            </div>
            DOM'a dahil olmasin diye div'i de yoruma kattim.
          */}
          </li>
        ))}
      </ul>


      <h3>Onay Bekleyen Kullanicilar</h3>

      <ul>
        {users 
          .filter(user => !user.approved)
          .map(user => (
            <li key={user.id} style={{
              backgroundColor: '#f8d7da',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              borderRadius: '4px',
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {user.email}
              <button
                onClick={() => handleApprove(user.id)}
                style={{
                  padding: '0.3rem 0.6rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Onayla
              </button>
            </li>
          ))}
      </ul>




    </div>
  );
}

export default AdminPanel;