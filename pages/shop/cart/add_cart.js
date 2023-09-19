import React, { useState } from 'react';
import ProductCard from './ProductCard';
import CartPreview from './CartPreview';

const AddToCartSection = ({ products }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        const existingProductIndex = cart.findIndex((item) => item.id === product.id);

        if (existingProductIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            updatedCart[existingProductIndex].total = updatedCart[existingProductIndex].quantity * updatedCart[existingProductIndex].price;
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...product, quantity: 1, total: product.price }]);
        }
    };

    return (
        <div className="flex">
            <div className="flex-1">
                <div className="grid grid-cols-2 gap-4 p-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))}
                </div>
            </div>
            <div className="flex-1">
                <button
                    className="fixed right-4 top-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setIsCartOpen(!isCartOpen)}
                >
                    View Cart
                </button>
                {isCartOpen && <CartPreview cartItems={cart} />}
            </div>
        </div>
    );
};

export default AddToCartSection;
