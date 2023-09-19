import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DetailedCarPart from './detailed_part';

import 'tailwindcss/tailwind.css';
import Footer from '@/pages/footer/Footer';


// upload parts to database
const UploadButton = () => {
    return (
        <Link href="./upload_part"
            className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500">Upload Part
        </Link>
    );
};

const handleAddToCartClick = () => {
    setIsAddingToCart(true);
    onAddToCart({
        part_name,
        manufacturer,
        location,
        model,
        description,
        image,
        price,
        quantity,
        seller,
    });
};

const CarParts = ({ part_name, manufacturer, location, model, description, image, price, quantity, seller }) => (

    <div className="bg-white shadow rounded-lg p-4 font-serif">
        <img className="h-48 w-full object-cover rounded-lg mb-4" src={image} alt={part_name} />
        <h2 className="text-xl font-bold mb-2">{part_name}</h2>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">Manufacturer: {manufacturer}</p>
                <p className="text-gray-500 text-sm">Location: {location}</p>
                <p className="text-gray-500 text-sm">Model: {model}</p>
            </div>
            <div className="flex flex-col items-end">
                <p className="text-gray-500 text-sm">Seller: {seller}</p>
                <p className="text-gray-500 text-sm">Quantity: {quantity}</p>
            </div>
        </div>
        <p className="text-gray-500 text-sm mt-2">{description}</p>
        <div className="flex justify-between items-end mt-4">
            <p className="text-lg font-bold">Kshs.{price}</p>
          
        </div>
    </div>
);





const CarPartsList = () => {
    // State to manage whether the modal is open or not
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [carParts, setCarParts] = useState([]);
    const [selectedPart, setSelectedPart] = useState(null); // State to manage selected car part


    // Function to open the modal and set the selected car part
    const handleOpenModal = (part) => {
        setSelectedPart(part);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setSelectedPart(null);
        setIsModalOpen(false);
    };


    useEffect(() => {
        // Fetch car parts data from Django backend API
        axios.get('http://127.0.0.1:8000/parts/car_parts/')
            .then(response => {
                setCarParts(response.data);
            })
            .catch(error => {
                console.error('Error fetching car parts:', error);
            });
    }, []);

    // Function to handle selecting a car part
    const handleSelectPart = (part) => {
        setSelectedPart(part);
    };
    console.log('carParts:', carParts);  // Add this line to check the value of carParts


    return (
        <>
            <div className="py-4 px-4 font-serif">
                <div className="container mx-auto flex items-center justify-between">
                    <nav className="text-sm">
                        <Link href="/" className="text-blue-600">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-600">Parts</span>
                    </nav>
                </div>
            </div>


            {/* Add the UploadButton component */}
            <div className="container mx-auto p-4 flex justify-end">
                <UploadButton />
            </div>

            {/* Your existing code */}
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-8 font-serif">Car Parts</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {carParts.map((part) => (
                        <div
                            key={part.id}
                            className="cursor-pointer"
                            onClick={() => handleOpenModal(part)} // Set the selected part when clicked
                        >
                            <CarParts
                                // Pass the part details as props to the CarParts component
                                key={part.id}
                                manufacturer={part.manufacturer}
                                part_name={part.partName}
                                seller={part.seller}
                                image={part.image}
                                location={part.location}
                                model={part.model}
                                description={part.description}
                                price={part.price}
                                quantity={part.quantity}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal component */}
            {isModalOpen && selectedPart && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-full h-full overflow-auto">
                        <DetailedCarPart carPart={selectedPart} />
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCloseModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default CarPartsList;
