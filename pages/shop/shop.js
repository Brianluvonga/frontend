import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';


const CarCard = ({ car, onCarClick }) => (
    <div className="bg-white shadow rounded-lg p-4 cursor-pointer" onClick={() => onCarClick(car)}>
        <img className="h-48 w-full object-cover rounded-lg mb-4" src={car.images[0]} alt={car.name} />
        <h2 className="text-xl font-bold mb-2 text-center">{car.name}</h2>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-lg font-semibold mb-2 text-center">{car.price}</p>
            </div>
            <div>
                <p className="text-gray-500 text-sm text-center">{car.seller}</p>
            </div>
        </div>
    </div>
);

const CarDetails = ({ car, onClose }) => (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 ">
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
                    <img className="h-auto w-full rounded-lg mb-4" src={car.images[0]} alt={car.name} />
                    <div className="flex align-left">
                        {car.images.map((image, index) => (
                            <img
                                key={index}
                                className="h-16 w-16 object-cover rounded-lg ml-1"
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
                    <div className="flex justify-left mt-8">
                        <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const CarRebuilds = () => {
    const cars = [
        {
            id: 1,
            name: '1941 Jeep RDI ',
            description: 'Compact car with excellent fuel efficiency.',
            price: '$10,000',
            location: 'Los Angeles, CA',
            seller: 'John Doe',
            images: ['/back1.png',],
        },
        {
            id: 1,
            name: 'Suzuki Swift',
            description: 'Compact car with excellent fuel efficiency.',
            price: '$10,000',
            location: 'Los Angeles, CA',
            seller: 'John Doe',
            images: ['/shop5.jpg'],
        }, {
            id: 1,
            name: 'Mini Zero Emission',
            description: 'Compact car with excellent fuel efficiency.',
            price: '$10,000',
            location: 'Los Angeles, CA',
            seller: 'John Doe',
            images: ['/shop8.jpg'],
        }, {
            id: 1,
            name: 'Mini Monster Edition',
            description: 'Compact car with excellent fuel efficiency.',
            price: '$10,000',
            location: 'Los Angeles, CA',
            seller: 'John Doe',
            images: ['/shop6.jpg'],
        },
        // Add more cars here
    ];

    const [selectedCar, setSelectedCar] = useState(null);

    const handleCarClick = (car) => {
        setSelectedCar(car);
    };

    const handleCloseDetails = () => {
        setSelectedCar(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-8">Build Your Car</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cars.map((car) => (
                    <CarCard key={car.id} car={car} onCarClick={handleCarClick} />
                ))}
            </div>
            {selectedCar && <CarDetails car={selectedCar} onClose={handleCloseDetails} />}
        </div>
    );
};

export default CarRebuilds;
