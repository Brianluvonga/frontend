import React from 'react';
import { FiX, FiMapPin } from 'react-icons/fi';

const CarDetailsPopup = ({ part, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative max-w-md w-full">
        <button 
          onClick={onClose} 
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <FiX size={30} />
        </button>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img src={part.image} alt={part.part_name} className="w-full h-64 object-cover" />
            <div className={`absolute top-4 right-4 px-3 py-1 text-sm font-bold text-white rounded ${part.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
              {part.quantity > 0 ? 'Available' : 'Sold'}
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{part.part_name}</h2>
            
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-700"><strong>Model:</strong> {part.model}</p>
              <p className="text-gray-600 flex items-center">
                <FiMapPin className="mr-1" /> Nairobi
              </p>
            </div>
            
            <div className="space-y-2 mb-6">
              <p><strong>Manufacturer:</strong> {part.manufacturer}</p>
              <p><strong>Quantity:</strong> {part.quantity}</p>
              <p><strong>Flagged:</strong> {part.flagged ? 'Yes' : 'No'}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-green-600">Kshs. {part.price}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPopup;