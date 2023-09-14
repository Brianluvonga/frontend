// components/Cart.js

import React from 'react';

const Cart = ({ cartItems }) => (
    <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 font-serif">Shopping Cart</h2>
        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default Cart;
