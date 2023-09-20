
import React from 'react';

const CartItemDetail = ({ item, onClose, onProceedToCheckout }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
    <div className="bg-white shadow rounded-lg p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-serif">{item.name}</h2>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="flex">
        <div className="w-1/2 pr-8">
          <img className="h-auto w-full rounded-lg mb-4 " src={item.images[0]} alt={item.name} />
        </div>
        <div className="w-1/2">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Specs:</h3>
            <p>{item.description}</p>
            <p>Location: {item.location}</p>
            <p>Seller: {item.seller}</p>
          </div>
          <div className="flex justify-left mt-8">
            <button className="bg-black hover:bg-gray-500 text-white py-2 px-4 rounded-lg" onClick={() => onProceedToCheckout(item)}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CartItemDetail;
