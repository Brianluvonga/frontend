import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import CarDetails from './view_car';
import Link from 'next/link';

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




const CarRebuilds = () => {
    const cars = [
        // {
        //     id: 1,
        //     name: '1941 Jeep RDI ',
        //     description: 'Compact car with excellent fuel efficiency.',
        //     price: '$10,000',
        //     location: 'Los Angeles, CA',
        //     seller: 'John Doe',
        //     images: ['/back1.png',],
        // },
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
            <h1 className="text-2xl font-bold mb-8">Shop</h1>
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
