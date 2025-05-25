import { useState } from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import AdminPanel from './pages/AdminPanel';
import CartPage from './pages/CartPage';
import { EventProvider } from '@/context/EventContext'; 

function App(){ 
  const [cartItems , setCartItems] = useState([]);

  const handleAddToCart = (event) => {
    setCartItems(prevItems => [...prevItems , event]);
  };

  return(
    <EventProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/main" element={<MainPage onAddToCart={handleAddToCart} />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
        </Routes>  
      </BrowserRouter>
    </EventProvider>
  );
}

export default App;
