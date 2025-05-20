// Basit giris ekranimiz olacak

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
    const navigate = useNavigate();
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault(); // Sahte Dogrulama ?
        if(email && password) {
            navigate('/main');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Giriş Yap</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre" required />
            <button type="submit">Giriş</button> 
        </form>
    );
}    

export default LoginPage;

/*
function LoginPage() { ... }
bu bir bildirimdir (function declaration). Bildirimlerde noktalı virgül gerekmez.

const LoginPage = () => { ... };
bu bir ifadeydi (function expression) → sonunda ; gereklidir.





*/