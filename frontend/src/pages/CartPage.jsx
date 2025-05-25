import "@/styles/cart.css";

function CartPage({ cartItems }) {
  const total = cartItems.reduce((sum , item) => sum + item.price , 0);
  

  return (
 <div className="cart-container">
      <h1 className="cart-title">Sepet</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Sepetiniz boş.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <span className="item-title">{item.title}</span>
              <span className="item-price">{item.price} ₺</span>
            </li>
          ))}
        </ul>
      )}

      <h3 className="cart-total">Toplam Tutar: {total} ₺</h3>
    </div>
  );
}

export default CartPage;