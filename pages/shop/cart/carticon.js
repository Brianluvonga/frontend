// CartIcon.js

import React from 'react';
import { useCart } from '../components/CartContext'; // Import the useCart hook


const CartIcon = () => {
    const { cart } = useCart(); // Access the cart from the context

    return (
        <div className="relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 4l3 9m-3-9l-3 9M13 12l3 9m-3-9l-3-9"
                />
            </svg>
            {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 rounded-full text-white px-2 py-1 text-xs">
                    {cart.length}
                </span>
            )}
        </div>
    );
};

export default CartIcon;
