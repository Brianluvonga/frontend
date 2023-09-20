import React from 'react';

const CarDetails = ({ car, onClose }) => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 font-serif">
    <div className="bg-white shadow rounded-lg p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{car.name}</h2>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex">
        <div className="w-1/2 pr-8">
          <img
            className="h-auto w-full rounded-lg mb-4 object-contain" // Adjust object-contain to maintain aspect ratio
            src={car.images[0]}
            alt={car.name}
          />
          <div className="flex align-left">
            {car.images.map((image, index) => (
              <img
                key={index}
                className="h-16 w-16 object-contain rounded-lg ml-1" // Adjust object-contain to maintain aspect ratio
                src={image}
                alt={`${car.name}-${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="w-1/2">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Specs:</h3>
            <p>{car.description}</p>
            <p>Location: {car.location}</p>
            <p>Seller: {car.seller}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CarDetails;
