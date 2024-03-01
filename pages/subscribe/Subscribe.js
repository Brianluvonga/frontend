import React, { useState, useEffect } from "react";
import axios from "axios";

const SubscribeSection = () => {
    const [formData, setFormData] = useState({
        email: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                setIsSubmitted(false);
                setErrorMessage('');
            }, 8000);

            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/subscribe/', formData);
            console.log(response.data);

            setFormData({
                email: '',
            });

            setIsSubmitted(true);
        } catch (error) {
            console.error(error);

            if (error.response && error.response.status === 400) {
                setErrorMessage('You have already subscribed.');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
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
                <div className="py-5 mx-auto px-4">
                    <h2 className="text-2xl text-center font-bold mb-6">Subscribe to Our Newsletter</h2>
                    <p className="text-gray-600 text-center mb-8">Get the latest updates straight to your inbox.</p>
                    <div className="max-w-md mx-auto">
                        <form onSubmit={handleSubmit}>
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
                {errorMessage && (
                    <div className="bg-red-200 text-red-800 py-2 px-4 flex items-center">
                        {errorMessage}
                    </div>
                )}
                {isSubmitted && !errorMessage && (
                    <div className="bg-green-200 text-black py-2 px-4 flex items-center">
                        Successfully Subscribed!
                    </div>
                )}
            </section>
        </>
    );
};

export default SubscribeSection;
