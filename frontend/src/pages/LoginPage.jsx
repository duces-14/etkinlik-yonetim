import "@/styles/login.css";
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
        <>

        <div className="welcome-animate">
            <span className="wel-part">WEL</span>
            <span className="come-part">COME</span>
        </div>
            <div className="quote-outside">
            Cum te ipsum eligis
            </div>
            
            <div className="login-container">
                <div className="frame-border"></div>
                <div className="left-panel">
                    <div className="latin-note">
                        omnia circa te quoque te eligunt.
                    </div>
                </div>
                <div className="right-panel">
                    <div className="form-wrapper">
                        <h2>Giriş Yap</h2>
                        <form onSubmit={handleLogin} className="login-form">            
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
                        <p className="register-link">
                            Kimsin? <span onClick={() => navigate('/register')} style={{ cursor: 'pointer', color: '#00f' }}>Kayıt ol</span>
                        </p>
                        </form>
                        {message && <p className="error-message">{message}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;