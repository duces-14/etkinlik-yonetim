import { useState } from 'react';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AdminPanel from './pages/AdminPanel';
import CartPage from './pages/CartPage';

function App(){ 
  const [cartItems , setCartItems] = useState([]);

  const handleAddToCart = (event) => {
    setCartItems(prevItems => [...prevItems , event]);
  };

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage onAddToCart={handleAddToCart} />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
