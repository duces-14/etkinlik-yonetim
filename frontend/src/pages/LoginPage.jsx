import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(""); // Onceki mesaji temizle

        try {
            const res = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/main");
            } else {
                setMessage(data.error || "Giris basarisiz");
            } 
        } catch (err) {
            setMessage("Sunucu hatasi");
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Giriş Yap</h2>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
                <input
                    type="email"
                    placeholder="E-posta"
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
                <button type="submit">Giriş</button>
            </form>
            {message && <p style={{ color: "red" }}>{message}</p>}      
        </div>
    );
}

export default LoginPage;