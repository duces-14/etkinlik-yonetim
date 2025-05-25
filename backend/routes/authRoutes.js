const express = require('express');
const { 
    registerUser,
    loginUser,
    getAllUsers,
    approveUser
} = require('../controllers/authController');   // reuire ile required farki , editor acisindan elbet ?

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.put('/approve/:id', approveUser);


module.exports = router;    // export degil exports yani cogul ?? HATALIymISIM :)