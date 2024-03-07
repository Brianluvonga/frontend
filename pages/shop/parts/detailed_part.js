import React, { useState } from 'react';

const DetailedCarPart = ({ carPart }) => {
    const [mainImage, setMainImage] = useState(carPart.image);

    const handleImageClick = (imageSrc) => {
        setMainImage(imageSrc);
    };

    return (
        <div className="bg-white shadow rounded-lg p-4 font-serif">
            <div className="flex flex-col md:flex-row">
                {/* Image section */}
                <div className="md:w-1/2">
                    <img
                        className="w-full h-auto rounded-lg mb-4 md:mb-0"
                        src={mainImage}
                        alt={carPart.part_name}
                        style={{ maxWidth: '500px', maxHeight: '500px' }}
                    />


                    {/* Additional images section */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {/* Right Side Image */}
                        {carPart.rightside_image && (
                            <img
                                src={carPart.rightside_image}
                                alt="Right Side"
                                className="w-20 h-auto rounded-lg mb-2 cursor-pointer"
                                onClick={() => handleImageClick(carPart.rightside_image)}
                            />
                        )}

                        {/* Left Side Image */}
                        {carPart.leftside_image && (
                            <img
                                src={carPart.leftside_image}
                                alt="Left Side"
                                className="w-20 h-auto rounded-lg mb-2 cursor-pointer"
                                onClick={() => handleImageClick(carPart.leftside_image)}
                            />
                        )}

                        {/* Inside Image */}
                        {carPart.inside_image && (
                            <img
                                src={carPart.inside_image}
                                alt="Inside"
                                className="w-20 h-auto rounded-lg mb-2 cursor-pointer"
                                onClick={() => handleImageClick(carPart.inside_image)}
                            />
                        )}

                        {/* Back Image */}
                        {carPart.back_image && (
                            <img
                                src={carPart.back_image}
                                alt="Back"
                                className="w-20 h-auto rounded-lg mb-2 cursor-pointer"
                                onClick={() => handleImageClick(carPart.back_image)}
                            />
                        )}
                    </div>
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
                    <p className="text-lg font-bold mt-4 md:absolute">Kshs.{carPart.price}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailedCarPart;
