const fs = require('fs');
const path = require('path');
// const { useDebugValue } = require('react'); nodemon ÇÖKTÜ

// JSON dosyasının yolu
const filePath = path.join(__dirname, '..', 'data', 'events.json');

// CRUD:Create, Read, Update, Delete

//  GET /events
const getEvents = (req, res) => {
    // Dosyayi oku
    fs.readFile(filePath, 'utf8', (err, data) => {
        // Dosya okunamazsa hata don
        if (err) {
            console.error('Veri/Etkinlik dosyasi okunamadi:', err);
            return res.status(500).json({ error: 'Sunucu hatasi' });
        }
        
        // Dosya okunduysa JSON formatina cevirmeye calisalim
        try {
            const events = JSON.parse(data);
            res.json(events);   // Tarayiciya JSON gonder
        } catch (parseError) {
            console.error('JSON parse hatasi:', parseError);
            res.status(500).json({ error: 'Veri bicimi hatali/gecersiz' });
        }
    });
};

// POST /events
const addEvent = (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Okuma hatasi:', err);
            return res.status(500).json({ error: 'Sunucu dosya hatasi' });
        }
        try {
            const events = JSON.parse(data);
            const newEvent = req.body;

            // Basit dogrulama (daha sonra belki gelistiririz)
            if (!newEvent.title || !newEvent.date || !newEvent.price) {
                return res.status(400).json({ error: 'Eksik bilgi' });
            }
            // benzersiz id uretelim (daha guvenlikli olabilir)
            newEvent.id = Math.random().toString(16).slice(2,6);
            events.push(newEvent);
            fs.writeFile(filePath, JSON.stringify(events, null, 2), (writeErr) => {     
                if (writeErr) { 
                    console.error('Yazma hatasi:', writeErr);
                    return res.status(500).json({ error: 'Veri yazilamadi' });
                }
                res.status(201).json({ message: 'Etkinlik eklendi', event: newEvent }); 
            });
        } catch (parseErr) {
            console.error('JSON parse hatasi:', parseErr);
            res.status(500).json({ error: 'Veri bicimi bozuk' }); 
        }
    });
};

// DELETE /events/:id
const deleteEvent = (req, res) =>{
    const eventId = req.params.id; // Bu noktada anlamadığım şey olusturdugumuz değikeni fonksiyon içerisinden req adı ile alıp
    //  .params adlı bir hazır fonksiyonla işleme soktuk galiba da ondan sonraki .id kısmını anlamadım. 
    // Benim genel de alışık olduğum şekil degisken.hazirFonksiyon formati oldugundan bu ksımı garipsedim ve anlamlandıramadım ?

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Silme sirasinda dosya okunamadi:', err);
            return res.status(500).json({ error: 'Sunucu dosya hatasi' });
        }

        try{
            const events = JSON.parse(data);
            const filteredEvents = events.filter(event => event.id !== eventId);    

            if (events.length === filteredEvents.length) {
                return res.status(404).json({ error: 'Etkinlik bulunamadi' });
            }

            fs.writeFile(filePath, JSON.stringify(filteredEvents, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Silme yazma hatasi:', writeErr);
                    return res.status(500).json({ error: 'Veri yazilamadi' });
                }

                res.status(200).json({ message: 'Etkinlik silindi' });
            });
        } catch (parseErr) {
            console.error('JSON parse hatasi:', parseErr);
            res.status(500).json({ error: 'Veri bicimi bozuk' });
        }
    });
};

// PUT /events/:id (Guncelleme islemi)
const updateEvent = (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Guncelleme sirasinda okuma hatasi:', err);
            return res.status(500).json({ error: 'Dosya okunamadi' });
        }

        try {
            let events = JSON.parse(data); // neden let !!?
            /*  events dizisini ileride değiştireceğiz. Eğer burada const kullansaydık, events[index] = ... gibi bir işlemde TypeError alırdık 
            çünkü: const ile tanımlanan değerlerin referansı değiştirilemez, let ile tanımladığımızda dizinin içeriğini değiştirebiliriz.*/

            const index = events.findIndex(event => event.id === id);
            if (index === -1) {
                return res.status(404).json({ error: 'Etkinlik bulunamadi' });
            }

            // Etkinligi guncelliyoruz
            events[index] = { ...events[index], ...updateData };

            fs.writeFile(filePath, JSON.stringify(events, null,  2), (writeErr) => {
                if (writeErr) {
                    console.error('Guncelleme sirasinda yazma hatasi:', writeErr);
                    return res.status(500).json({ error: 'Veri kaydedilemedi' });
                }

                res.status(200).json({ message: 'Etkinlik guncellendi', updated: events[index] });
            });

        } catch (parseErr) {
            console.error('JSON parse hatasi:', parseErr);
            res.status(500).json({ error: 'Veri bicimi hatali' });
        }
    });
};




module.exports = {
  getEvents,
  addEvent, // alta ekleme yapinca son satir olmaktan ciktigi icin bu satirin sonuna "," virgul attik.
  deleteEvent,   // ekledim.
  updateEvent
};

