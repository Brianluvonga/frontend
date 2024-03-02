import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Replace with the actual path to your image
const vehicleImage = '/shop2.png';

// Vehicle data (replace with your actual data)
const vehicles = [
    { id: 1, make: 'Tesla', year: '2020', distance: '30 miles', county: 'Kakamega' },
    // Add more vehicles as needed
];

const ShopForCar = () => {
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedDistance, setSelectedDistance] = useState('');
    const [selectedCounty, setSelectedCounty] = useState('');

    const handleFilterSubmit = () => {
        // Handle filter submission here
        // You can use selectedMake, selectedYear, selectedDistance, selectedCounty to filter the vehicles
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100">
            <header className="text-3xl font-bold mb-8">
                Shop for Car
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 car-list-section">
                <div className="border rounded-lg p-4">
                    <label className="block mb-2">Make:</label>
                    <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)} className="border rounded px-2 py-1 w-full">
                        <option value="">All Makes</option>
                        {vehicles.map((car) => (
                            <option key={car.make} value={car.make}>
                                {car.make}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="border rounded-lg p-4">
                    <label className="block mb-2">Year:</label>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="border rounded px-2 py-1 w-full">
                        <option value="">All Years</option>
                        {/* Add available years */}
                    </select>
                </div>

                <div className="border rounded-lg p-4">
                    <label className="block mb-2">Distance:</label>
                    <select value={selectedDistance} onChange={(e) => setSelectedDistance(e.target.value)} className="border rounded px-2 py-1 w-full">
                        <option value="">All Distances</option>
                        {/* Add available distances */}
                    </select>
                </div>

                <div className="border rounded-lg p-4">
                    <label className="block mb-2">County:</label>
                    <select value={selectedCounty} onChange={(e) => setSelectedCounty(e.target.value)} className="border rounded px-2 py-1 w-full">
                        <option value="">All Counties</option>
                        {/* Add available counties */}
                    </select>
                </div>
            </div>

            <div className="flex justify-left mt-4 rounded">
                <button className="bg-blue-500 text-white py-3 px-6 rounded-md" onClick={handleFilterSubmit}>
                    Apply Filters
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 car-list-section">
                {/* Display cars based on filters */}
                {/* {vehicles.map((car) => (
                    <div
                        key={car.id}
                        className="car-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100"
                        onClick={() => handleCarClick(car)}
                    >
                        <Image
                            src={vehicleImage}
                            alt="Car Image"
                            width={300}
                            height={200}
                            layout="responsive"
                            className="w-full h-auto rounded-lg"
                        />
                        <p className="text-lg font-bold mb-2">{car.make}</p>
                        <p className="text-gray-600">{car.year} | {car.distance} | {car.county}</p>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default ShopForCar;
