const eventRoutes = require('./routes/eventRoutes');
const express =require('express');
const cors =require('cors');
const authRoutes = require('./routes/authRoutes');


const app = express();
const PORT = 3001;

// CORS aktif edilsin
app.use(cors());

// JSON veriyi parse edebilmesi icin
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
    res.send('Sunucu calisiyor!');
});
app.use('/events', eventRoutes);

app.use('/auth', authRoutes);


// Sunucuyu baslatalim
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde calisiyor`);
});