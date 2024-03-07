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
        imagePreview: null,
        rightside_image: null,
        rightside_imagePreview: null,
        leftside_image: null,
        leftside_imagePreview: null,
        inside_image: null,
        inside_imagePreview: null,
        back_image: null,
        back_imagePreview: null, // Added state for image preview
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
        const { name, files } = event.target;
        const selectedImage = files[0];
        setFormData({
            ...formData,
            [name]: selectedImage,
            [`${name}Preview`]: URL.createObjectURL(selectedImage),
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
                    imagePreview: null,
                    rightside_image: null,
                    rightside_imagePreview: null,
                    leftside_image: null,
                    leftside_imagePreview: null,
                    inside_image: null,
                    inside_imagePreview: null,
                    back_image: null,
                    back_imagePreview: null,
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
                        <span className="text-gray-600">Upload</span>

                    </nav>
                </div>
            </div>

            <div className="container mx-auto p-4 ">
                <h1 className="text-2xl font-bold mb-8 font-serif">Already Built Car</h1>
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
                    <div className="mb-4 flex">
                        <div className="w-1/2 pr-2">
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
                        <div className="w-1/2 pl-2">
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
                            Main Image
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
                        {formData.imagePreview && (
                            <img src={formData.imagePreview} alt="Image Preview" className="mt-2 max-w-xs" />
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="rightside_image" className="block text-gray-700 text-sm font-bold mb-2">
                            Right Side Image
                        </label>
                        <input
                            type="file"
                            id="rightside_image"
                            name="rightside_image"
                            onChange={handleImageChange}
                            className="w-full"
                            accept="image/*"
                            required
                        />
                        {formData.rightside_imagePreview && (
                            <img src={formData.rightside_imagePreview} alt="Right Side Image Preview" className="mt-2 max-w-xs" />
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="leftside_image" className="block text-gray-700 text-sm font-bold mb-2">
                            Left Side Image
                        </label>
                        <input
                            type="file"
                            id="leftside_image"
                            name="leftside_image"
                            onChange={handleImageChange}
                            className="w-full"
                            accept="image/*"
                            required
                        />
                        {formData.leftside_imagePreview && (
                            <img src={formData.leftside_imagePreview} alt="Left Side Image Preview" className="mt-2 max-w-xs" />
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="inside_image" className="block text-gray-700 text-sm font-bold mb-2">
                            Inside Image
                        </label>
                        <input
                            type="file"
                            id="inside_image"
                            name="inside_image"
                            onChange={handleImageChange}
                            className="w-full"
                            accept="image/*"
                            required
                        />
                        {formData.inside_imagePreview && (
                            <img src={formData.inside_imagePreview} alt="Inside Image Preview" className="mt-2 max-w-xs" />
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="back_image" className="block text-gray-700 text-sm font-bold mb-2">
                            Back Image
                        </label>
                        <input
                            type="file"
                            id="back_image"
                            name="back_image"
                            onChange={handleImageChange}
                            className="w-full"
                            accept="image/*"
                            required
                        />
                        {formData.back_imagePreview && (
                            <img src={formData.back_imagePreview} alt="Back Image Preview" className="mt-2 max-w-xs" />
                        )}
                    </div>

                    <div className="mb-4 flex">
                        <div className="w-1/2 pr-2">
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
                        <div className="w-1/2 pl-2">
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
