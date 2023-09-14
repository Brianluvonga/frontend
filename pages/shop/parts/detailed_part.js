import React from 'react';

const DetailedCarPart = ({ carPart }) => (
    <div className="bg-white shadow rounded-lg p-4 font-serif">
        <div className="flex flex-col md:flex-row">
            {/* Image section */}
            <div className="md:w-1/2">
                <img
                    className="w-full h-auto rounded-lg mb-4 md:mb-0"
                    src={carPart.image}
                    alt={carPart.part_name}
                />
            </div>

            {/* Details section */}
            <div className="md:w-1/2 md:pl-4">
                <div className="flex justify-between items-start md:items-end mb-2">
                    <div>
                        <h2 className="text-xl font-bold mb-2">{carPart.part_name}</h2>

                        <p className="text-gray-500 text-sm">Manufacturer: {carPart.manufacturer}</p>
                        <p className="text-gray-500 text-sm">Location: {carPart.location}</p>
                        <p className="text-gray-500 text-sm">Model: {carPart.model}</p>
                    </div>
                    <div className="md:ml-4">
                        <p className="text-gray-500 text-sm">Seller: {carPart.seller}</p>
                        <p className="text-gray-500 text-sm">Quantity: {carPart.quantity}</p>
                    </div>
                </div>
                <p className="text-gray-500 text-sm mt-2 leading-snug">Description: {carPart.description}</p>
                <p className="text-lg font-bold mt-4 md:absolute ">Kshs.{carPart.price}</p>

                {/* Additional details can be added here */}
            </div>
        </div>
    </div>
);

export default DetailedCarPart;
