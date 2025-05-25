import '@/styles/register.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Kayıt başarılı, onay bekleniyor.");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(data.error || "Kayıt başarısız.");
      }
    } catch (error) {
      setMessage("Sunucu hatası");
    }
  };

  return (
    <>     
     <div className='quote-register-pictures'>Gidenler fotoğraflarda kalır, fotoğraflar ise kalanlarda...</div>
      <div className="register-container">
        <div className="register-frame-border" />

        <div className="register-left-panel">
          <div className="register-form-wrapper">
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleRegister}>
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
              <p className="login-link">
                Sen misin? <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#00f' }}>Giriş Yap</span>
              </p>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>

        <div className="register-right-panel" />

        <div className="register-welcome-animate">
          <span className="register-wel-part">WEL</span>
          <span className="register-come-part">COME</span>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
