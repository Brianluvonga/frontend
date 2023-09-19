import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="border p-4 shadow-lg rounded-lg m-4">
            <img src={product.images[0]} alt={product.name} className="w-32 h-32 object-cover rounded" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-2 flex items-center justify-between">
                {product.price !== undefined ? (
                    <span className="text-gray-700">${product.price.toFixed(2)}</span>
                ) : (
                    <span className="text-gray-700">Price not available</span>
                )}
                <div className="flex items-center">
                    <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => onAddToCart(product)}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};


export default ProductCard;
