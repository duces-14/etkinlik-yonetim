const express = require('express');
const { getEvents, addEvent, deleteEvent, updateEvent } = require('../controllers/eventController'); // Controller'dan fonksiyonları al

const router = express.Router();

// GET /events -> tum etkinlikleri getir
router.get('/', getEvents);

// POST /events -> yeni etkinlik ekle
router.post('/', addEvent);

// DELETE /events -> etkinlik sil
router.delete('/:id', deleteEvent);

// PUT /events -> etkinlik guncelle
router.put('/:id', updateEvent);

module.exports = router;
