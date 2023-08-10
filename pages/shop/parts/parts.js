import Link from 'next/link';

import React from 'react';

import 'tailwindcss/tailwind.css';


// upload parts to database
const UploadButton = () => {
    return (
        <Link href="./upload_part"
            className="bg-black text-white px-4 py-2 rounded-lg shadow">Upload Part
        </Link>
    );
};



const CarParts = ({ manufacturer, partName, seller, image }) => (
    <div className="bg-white shadow rounded-lg p-4 font-serif">
        <img className="h-48 w-full object-cover rounded-lg mb-4" src={image} alt={partName} />
        <h2 className="text-xl font-bold mb-2 text-left">{partName}</h2>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm text-center">Manufacturer: {manufacturer}</p>
            </div>
            <div>
                <p className="text-gray-500 text-sm text-center">Seller: {seller}</p>
            </div>
        </div>
    </div>
);

const CarPartsList = () => {
    const carParts = [
        {
            id: 1,
            manufacturer: 'ABC Parts',
            partName: 'Alminium Wheels',
            seller: 'John Doe',
            image: '/parts/part1.jpg',
        },
        {
            id: 2,
            manufacturer: 'XYZ Auto',
            partName: 'TDR Rear Wheels',
            seller: 'Jane Smith',
            image: '/parts/part2.jpg',
        },
        // Add more car parts here
    ];

    return (
        <>
            <div className="py-4 px-4 font-serif">
                <div className="container mx-auto">
                    <nav className="text-sm">
                        <Link href="/" className="text-blue-600">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-600">About</span>
                    </nav>
                </div>
            </div>

            {/* Add the UploadButton component */}
            <div className="container mx-auto p-4 flex justify-end">
                <UploadButton />
            </div>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-8 font-serif">Car Parts</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {carParts.map((part) => (
                        <CarParts
                            key={part.id}
                            manufacturer={part.manufacturer}
                            partName={part.partName}
                            seller={part.seller}
                            image={part.image}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default CarPartsList;
