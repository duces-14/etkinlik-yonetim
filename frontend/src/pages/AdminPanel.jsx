import '@/styles/admin.css';
import { useState, useContext, useEffect } from 'react';
import { EventContext } from '@/context/EventContext'; // Context baglantisini ekledik

import EditInlineForm from '@/components/EditInlineForm';


function AdminPanel() {
  const { events, setEvents, fetchEvents } = useContext(EventContext); // Context verisini aldim.
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [users, setUsers] = useState([]); 
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
      fetchEvents(); 
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
      console.error("Etkinlik silinemedi:", error);  
    }
  };

  return (
    <div className="admin-container">
      <h2>Yeni Etkinlik Ekle</h2>

      <form onSubmit={handleAddEvent} className="admin-form">
        {/* inputlar ve butonlar aynı */}
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
          <li key={event.id} className="event-card">
            {editingId === event.id ? (
              <EditInlineForm
              event={event}
              onCancel={() => setEditingId(null)}
              onUpdate={fetchEvents}
              />
            ) : (
              <>
                <span style={{ color: 'black', fontWeight: 'bold' }}>
                  {event.title} | {event.date} | {event.price === 0 ? 'Ücretsiz' : `${event.price} ₺`}
                </span>
                <div className='btn-group'>
                  <button className="btn-edit" onClick={() => setEditingId(event.id)}>Düzenle</button>
                  <button className="btn-delete" onClick={() => handleDelete(event.id)}>Sil</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {users.filter(user => !user.approved).length > 0 && (
        <div className='approval-panel'>
          <h3>Onay Bekleyen Kullanicilar</h3>
          <ul style={{ paddingLeft: 0 }}>
            {users.filter(user => !user.approved).map(user => (
                <li key={user.id} className='pending-user'>
                  <span>{user.email}</span>
                  <button onClick={() => handleApprove(user.id)}>Onayla</button>
                </li>
              ))}
          </ul>
        </div>
      )}  
    </div>
  
  );
}

export default AdminPanel;