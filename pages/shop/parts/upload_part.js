import Link from 'next/link';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const Upload = () => {
    const [formData, setFormData] = useState({
        part_name: '',
        manufacturer: '',
        location: '',
        model: '',
        description: '',
        image: null,
        price: '',
        quantity: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (event) => {
        setFormData({
            ...formData,
            image: event.target.files[0],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object to send the multipart/form-data
        const formDataObj = new FormData();
        for (const key in formData) {
            formDataObj.append(key, formData[key]);
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/parts/api/car_parts/', {
                method: 'POST',
                body: formDataObj,
            });

            if (response.ok) {
                // Handle successful response, e.g., show a success message or redirect to another page
                console.log('Car part uploaded successfully!');

                // Clear the form fields after successful upload
                setFormData({
                    part_name: '',
                    manufacturer: '',
                    location: '',
                    model: '',
                    description: '',
                    image: null, // Reset the image field to null or any default value you prefer
                    price: '',
                    quantity: '',
                });
            } else {
                // Handle error response
                console.error('Failed to upload car part.');
            }
        } catch (error) {
            console.error('Error occurred while uploading car part:', error);
        }
    };

    return (
        <>
            <div className="py-4 px-4 font-serif">
                <div className="container mx-auto">
                    <nav className="text-sm">
                        <Link href="/" className="text-blue-600">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href="./upload_part"
                            className="text-blue-600">Upload
                        </Link>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-8 font-serif">Upload Car Part</h1>
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                    <div className="mb-4">
                        <label htmlFor="part_name" className="block text-gray-700 text-sm font-bold mb-2">
                            Part Name
                        </label>
                        <input
                            type="text"
                            id="part_name"
                            name="part_name"
                            value={formData.part_name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-gray-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="manufacturer" className="block text-gray-700 text-sm font-bold mb-2">
                            Manufacturer
                        </label>
                        <input
                            type="text"
                            id="manufacturer"
                            name="manufacturer"
                            value={formData.manufacturer}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-gray-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-gray-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="model" className="block text-gray-700 text-sm font-bold mb-2">
                            Model
                        </label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-gray-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="4"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-gray-400"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            className="w-full"
                            accept="image/*"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-gray-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-gray-400"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-600 focus:outline-none focus:bg-blue-600"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Upload;
