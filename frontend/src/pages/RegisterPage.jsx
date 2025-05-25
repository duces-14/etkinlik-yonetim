// Basit giris ekranimiz olacak

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function RegisterPage() {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [message, setMessage] = useState("");

    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault(); // Sahte Dogrulama ?
        setMessage(""); // onceki mesaji temizle

        try {
            const res = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            if (res.ok) {
                setMessage("Kayit basarili, onay bekleniyor.");
                setTimeout(() => navigate("/login"), 2000); // 2 saniye sonra login sayfasina yonlendiriyorum    
            } else {
                setMessage(data.error || "Kayit basarisiz.");   // ???
            }
        } catch (error) {
            setMessage("Sunucu hatasi");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>  {/** neden çift {{ parantez ?? */}
                <input 
                type='email' 
                placeholder='E-posta' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                />
                <input 
                type="password" 
                placeholder="Şifre" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                />
                <button type="submit">Kaydol</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}    

export default RegisterPage;