import { useState, useEffect } from 'react';

function EditInlineForm({ event, onCancel, onUpdate }) { // merak ettim de acaba fonksiyon adi ile dosya adi ayni mi olmali ?
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState(''); // bu bos tirnaklar ile ne yapiyorduk ??

    useEffect(() => {   // galiba parametre almayan bir fonksiyon icine girdik. Hatta cikti da yazdirmayacak yani bir nevi void diyebilir miyiz ?
        setTitle(event.title);
        setDate(event.date);
        setPrice(event.price);
    }, [event]);    // [event] kosuluna gore guncelle demekti galiba !

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:3001/events/${event.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }, // ne demek bu satir??
                body: JSON.stringify({ title, date, price: parseInt(price) }),
            });
            onUpdate();
            onCancel();
        } catch (err) {
            console.error("Guncelleme hatasi:", err);
        }
    };

    return (
        <form onSubmit={handleUpdate} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" required />
            <button type="submit">Kaydet</button>
            <button type="button" onClick={onCancel}>İptal</button>
        </form>
    );
}

export default EditInlineForm;