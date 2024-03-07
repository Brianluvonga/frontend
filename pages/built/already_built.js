import 'tailwindcss/tailwind.css';
import React, { useState } from 'react';
import Link from 'next/link';

import Image from 'next/image';
import { useRouter } from 'next/router';
import Footer from '../footer/Footer';
import { stringify } from 'postcss';

const carData = [
    // Replace with your actual car data objects, including image paths, names, filters, and prices
    { id: 1, name: 'Mercedes-Benz EQE', image: '/filter1.jpg', filter: 'EVs', price: 75000 },
    { id: 2, name: 'FIAT 500e', image: '/filter2.jpg', filter: 'EVs', price: 35000 },
    { id: 3, name: 'Porsche Taycan', image: '/filter3.jpg', filter: 'EVs', price: 150000 },
    { id: 4, name: 'Toyota bZ4X', image: '/filter4.jpg', filter: 'SUVs', price: 40000 },
    { id: 5, name: 'Mercedes-Benz EGE 500', image: '/filter5.jpg', filter: 'Sedans', price: 90000 },
    { id: 6, name: 'Mercedes-Benz EQE 350', image: '/filter6.jpg', filter: 'EVs', price: 85000 },
    { id: 7, name: 'Mercedes-Benz EQE 350', image: '/filter7.jpg', filter: 'EVs', price: 85000 },

    // ... Add more car data objects as needed
];

const topRecommendationsData = [
    // Replace with your actual top recommendations data objects, including image paths, names, filters, and prices
    { id: 1, name: 'Mini', image: '/rec1.jpg', filter: 'Peugot', price: 80000 },
    { id: 2, name: 'Audi e-tron GT', image: '/rec2.jpg', filter: 'Mercedes', price: 95000 },
    { id: 3, name: 'Ford Mustang Mach-E', image: '/rec3.jpg', filter: 'Mini Cooper', price: 60000 },
    { id: 4, name: 'Volvo XC90 Recharge', image: '/rec4.jpg', filter: 'Range Rover', price: 70000 },
    { id: 5, name: 'BMW i4', image: '/rec5.jpg', filter: 'Jaguar', price: 85000 },
    { id: 6, name: 'Porsche Macan EV', image: '/rec6.jpg', filter: 'Peugot', price: 90000 },
    // ... Add more top recommendations data objects as needed
];

const filters = ['All', ...new Set(carData.map((car) => car.filter))];
const filter = ['All', ...new Set(topRecommendationsData.map((car) => car.filter))];


const AlreadyBuilt = () => {
    // for already built
    const [selectedFilter, setSelectedFilter] = useState(filters[0]);
    const filteredCars = carData.filter((car) => car.filter === selectedFilter || selectedFilter === 'All')

    // top recommendations
    const [selectedTopFilter, setSelectedTopFilter] = useState(filter[0]);
    const filteredTopRecommendations = topRecommendationsData.filter((car) => car.filter === selectedTopFilter || selectedTopFilter === 'All');

    const handleRecFilterChange = (event) => {
        setSelectedTopFilter(event.target.value);
    };


    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    const router = useRouter();

    const handleCarClick = (car) => {
        router.push({
            pathname: `car/`,
            query: { car: JSON.stringify(car) }// Pass the entire car object as a query parameter
        });
    };


    return (
        <>
            <div className="py-4 px-4 font-serif">
                <div className="container mx-auto flex items-center justify-between">
                    <nav className="text-sm">
                        <Link href="/" className="text-blue-600">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-600">AlreadyBuilt</span>
                    </nav>
                </div>
            </div>


            <div className="container mx-auto px-4 py-8">
                <header className="text-left text-3xl font-bold mb-8">
                    Already built project cars
                </header>

                <div className="flex justify-left mb-4">
                    <select value={selectedFilter} onChange={handleFilterChange} className="border rounded px-2 py-1">
                        {filters.map((filter) => (
                            <option key={filter} value={filter}>
                                {filter}
                            </option>
                        ))}
                    </select>
                </div>

                <main className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {filteredCars.map((car) => (
                        <div
                            key={car.id}
                            className="car-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCarClick(car)}
                        >
                            <Image
                                src={car.image}
                                alt={car.name}
                                width={300}
                                height={200}
                                layout="responsive"
                                className="w-full h-auto rounded-lg"
                            />
                            <h2 className="text-xl font-semibold mt-4">{car.name}</h2>
                            <p className="text-lg text-gray-600 mt-2">Ksh.{car.price}</p>
                        </div>
                    ))}
                </main>
            </div>



            <div className="container mx-auto px-4 py-8">
                <header className="text-left text-2xl font-bold mb-8">
                    Recommendations For Top Sellers
                </header>

                <div className="flex justify-left mb-4">
                    {filter.map((filter) => (
                        <button
                            key={filter}
                            className={`border rounded-lg px-2 py-1 mr-2 ${selectedTopFilter === filter ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
                            onClick={() => handleRecFilterChange({ target: { value: filter } })}
                        >
                            {filter}
                        </button>
                    ))}
                </div>



                <main className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {filteredTopRecommendations.map((car) => (
                        <div
                            key={car.id}
                            className="car-card bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:bg-gray-100"
                            onClick={() => handleCarClick(car)}
                        >
                            <Image
                                src={car.image}
                                alt={car.name}
                                width={300}
                                height={200}
                                layout="responsive"
                                className="w-full h-auto rounded-lg"
                            />
                            <h2 className="text-xl font-semibold mt-4">{car.name}</h2>
                            <p className="text-lg text-gray-600 mt-2">Price: ${car.price}</p>
                        </div>
                    ))}
                </main>
            </div>

            <Footer />


        </>
    );
};

export default AlreadyBuilt;
