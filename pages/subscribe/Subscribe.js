

import React, { useState, useEffect } from "react";

import axios from "axios";

const SubscribeSection = () => {

    const [formData, setFormData] = useState({
        email: '',
    });


    const [isSubmitted, setIsSubmitted] = useState(false);
    // Function to reset the success message status after a duration
    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                setIsSubmitted(false);
            }, 8000); // Set the duration in milliseconds (10 seconds in this example)

            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Make an HTTP POST request to the backend API endpoint
            const response = await axios.post('http://127.0.0.1:8000/api/subscribe/', formData);

            // Handle the response from the backend (e.g., show a success message)
            console.log(response.data);

            // Clear the form after successful submission
            setFormData({
                email: '',
            });

            // Set isSubmitted to true to trigger the success message display
            setIsSubmitted(true);
        } catch (error) {
            // Handle any errors that occurred during the form submission
            console.error(error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    return (

        <>
            <section>
                <div className=" py-5 mx-auto px-4">
                    <h2 className="text-2xl text-center font-bold mb-6">Subscribe to Our Newsletter</h2>
                    <p className="text-gray-600 text-center mb-8">Get the latest updates straight to your inbox.</p>
                    <div className="max-w-md mx-auto">
                        <form onSubmit={handleSubmit} >
                            <input
                                className="flex-grow py-3 px-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-100 bg-gray-200"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                className="bg-black hover:bg-white hover:text-black text-white py-3 px-6 rounded-r-lg transition duration-300 ease-in-out"
                                type="submit"
                               
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                {isSubmitted && (
                    <div className="bg-green-200 text-black py-2 px-4 flex items-center">
                        Successfully Subscribed!
                    </div>
                )}
            </section>
        </>

    );
};

export default SubscribeSection;
