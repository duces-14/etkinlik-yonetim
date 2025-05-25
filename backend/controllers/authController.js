const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, '..', 'data', 'users.json');  // bu satir ne anlatiyor

// Yardimci: JSON dosyasini oku ?
function readUsers() {
    const data = fs.readFileSync(userFilePath, 'utf8');
    return JSON.parse(data);
}

// Yardimci: JSON dosyasina yaz
function writeUsers(users) {
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
}

// POST /auth/register
const registerUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email ve sifre zorunludur.' });
    }

    const users = readUsers();

    const existingUser = users.find(u => u.email === email); // ?? ( !! === 3 adet)
    if (existingUser) {
        return res.status(409).json({ error: 'Bu email zaten kayitli.' });  // 409 ilk defa gecti ?
    }

    const newUser = {
        id: Math.random().toString(16).slice(2), // slice ?
        email,
        password,
        role: "user",   // ??
        approved: false,
        firstLogin: true
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'Kayit alindi, onay bekleniyor.' });
};


// POST /auth/login
const loginUser = (req, res) => {
    const { email, password } = req.body;   // body neydi ?
    const users = readUsers();

    const user = users.find(u => u.email === email && u.password === password);    // ! == iki adet degil !
    if (!user) {
        return res.status(401).json({ error: 'Gecersiz email ya da sifre.' });
    }

    if (!user.approved) {
        return res.status(403).json({ error: 'Hesap henuz onaylanmamis.' }); // bu kodlarin her birine calismalisin
    }

    res.status(200).json({
        message: 'Giris basarili',
        user: {
            id: user.id,
            email: user.email,
            role: user.role,
            firstLogin: user.firstLogin
        }
    });
};

// GET /auth/users - Tum kullanicilari getirelim
const getAllUsers = (req, res) => {
    try {
        const users = readUsers();
        res.status(200).json(users);
    } catch (err) {
        console.error('Kullanicilari okuma hatasi:', err);
        res.status(500).json({ error: 'Sunucu hatasi' });
    }
};


// PUT /auth/approve/:id  - Belirli bir kullaniciyi onaylamak icin
const approveUser = (req, res) => {
    const { id } = req.params;

    try {
        const users = readUsers();
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'Kullanici bulunamadi' });
        }

        users[userIndex].approved = true;
        writeUsers(users);

        res.status(200).json({ message: 'Kullanici onaylandi', user: users[userIndex] });
    } catch (err) {
        console.error('Onaylama hatasi:', err);
        res.status(500).json({ error: 'Sunucu hatasi' });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    approveUser
};