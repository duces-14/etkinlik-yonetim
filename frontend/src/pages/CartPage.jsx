/* Sepet Gosterimi icin kullanacagiz */

// import React from 'react'; (React 17+ ile bu zorunluluk kalktı JSX'ler hatasiz calisiyor cunku otomatik ice aktarim yapiyor 17+ versiyonlarda)

function CartPage({ cartItems }) {
  const total = cartItems.reduce((sum , item) => sum + item.price , 0);
  

  return (
    <div>
      <h1>Sepet</h1>
      {cartItems.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.title} - {item.price} ₺
            </li>
          ))}
        </ul>
      )}
      <h3>Toplam Tutar: {total} ₺</h3>
    </div>
  );
}

export default CartPage;