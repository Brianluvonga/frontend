import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const CarListing = () => {
    const [sellerInfo, setSellerInfo] = useState({
        phone: '(708) 340-7589',
        name: '',
        email: '',
        message: '',
    });

    // Dummy seller info
    const sellerInformation = {
        location: '123 Main Street',
        county: 'Anytown',
        street: 'Any County',
        phone: '(123) 456-7890',
    };

    const [mainImageIndex, setMainImageIndex] = useState(0);

    const handleChange = (event) => {
        setSellerInfo({ ...sellerInfo, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Your message has been sent!');
    };

    const handleImageClick = (index) => {
        setMainImageIndex(index);
    };

    const carImages = ['/shop2.png', '/shop2.png', '/shop2.png'];
    // Vehicle features data
    const vehicleFeatures = [
        { name: 'Basics', description: 'Description of Basics' },
        { name: 'Features', description: 'Description of features' },
        { name: 'Key Specs', description: 'Description of Key Specs' },
        // Add more features as needed
    ];

    return (
        <>
            <Head>
                <title>2019 BMW i3 REX for Sale</title>
            </Head>
            <div className="container mx-auto px-4 py-8 flex flex-wrap">
                <div className="w-full lg:w-1/2 px-4 py-4">
                    <div className="w-full lg:w-1/2 flex items-center justify-center">
                        <Image
                            src={carImages[mainImageIndex]}
                            alt="2019 BMW i3 REX"
                            width={600}
                            height={400}
                            priority
                        />
                    </div>
                    <h3 className="text-xl font-bold mb-4 mt-8">More Images</h3>
                    <div className="image-carousel-container overflow-x-auto flex">
                        <div className="image-carousel flex">
                            {carImages.map((image, index) => (
                                <div key={index} className="carousel-image mr-4">
                                    <Image
                                        src={image}
                                        alt={`2019 BMW i3 REX - Image ${index + 1}`}
                                        width={150}
                                        height={100}
                                        onClick={() => handleImageClick(index)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 px-4 py-4">
                    <h2 className="text-2xl font-bold mb-4">Contact Seller</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 mb-2">
                                Your Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="John Doe"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={sellerInfo.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 mb-2">
                                Your Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="johndoe@example.com"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={sellerInfo.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 mb-2">
                                Phone (Optional):
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="(555) 555-5555"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={sellerInfo.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-700 mb-2">
                                Message:
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                rows="5"
                                placeholder="Write your message here..."
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={sellerInfo.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Check Availability
                        </button>

                    </form>
                </div>
            </div>

            {/* Vehicle Features */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Vehicle Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vehicleFeatures.map((feature, index) => (
                        <div key={index} className="border p-4 rounded-md">
                            <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Seller Info */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Seller Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    <div className="border flex flex-col p-4 rounded-lg">
                        <p><strong>Location:</strong> {sellerInformation.location}</p>
                        <p><strong>County:</strong> {sellerInformation.county}</p>
                        <p><strong>Street:</strong> {sellerInformation.street}</p>
                        <p><strong>Phone:</strong> {sellerInformation.phone}</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .carousel-image {
                    flex: 0 0 auto;
                }
                .image-carousel-container {
                    max-width: 100%;
                }
                .image-carousel {
                    display: flex;
                    gap: 20px;
                    padding-bottom: 10px;
                }
            `}</style>
        </>
    );
};

export default CarListing;
