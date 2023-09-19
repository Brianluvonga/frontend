import React from 'react';

const CartPreview = ({ cartItems }) => {
    return (
        <div className="fixed right-0 top-0 h-screen w-1/4 bg-white shadow-lg overflow-y-auto">
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index} className="mb-2">
                                {item.name} x{item.quantity} - ${item.total.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CartPreview;
