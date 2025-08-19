/* components/Cart.js */
import React from 'react';
import { useCartStore } from '../store/useAppStore';

function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  console.log('Cart rendered');

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '5px' }}>
              {item.title} - ${item.price}
              <button
                onClick={() => removeFromCart(idx)}
                style={{ marginLeft: '10px' }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
