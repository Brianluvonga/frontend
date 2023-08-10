import React, { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';
import Footer from "../footer/Footer";
import axios from 'axios';
import { useRouter } from "next/router";
import Link from 'next/link';


const RegisterScreen = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        password: '',
    });

    const [isPopupVisible, setIsPopupVisible] = useState(false); // State to manage the popup visibility
    const [isRegistering, setIsRegistering] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const getCSRFToken = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/csrf_cookie/');
            const csrfToken = response.data.csrfToken;
            return csrfToken;
        } catch (error) {
            console.error('Error fetching CSRF token:', error);
            return null;
        }
    };
    const [error, setError] = useState('');

    const router = useRouter(); // Create a router object
    useEffect(() => {
        if (isPopupVisible) {
            // Wait for 5 seconds and then hide the popup
            const timeout = setTimeout(() => {
                setIsPopupVisible(false);
                router.push("./login"); // Replace "/login" with the path of your login page
            }, 5000);

            return () => clearTimeout(timeout); // Cleanup the timeout on component unmount
        }
    }, [isPopupVisible]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsRegistering(true);
        console.log(formData);

        // Get the CSRF token from the cookie
        const csrfToken = getCSRFToken();
        var url = 'http://127.0.0.1:8000/api/register/';



        // Send the form data to the Django backend using axios
        axios.post(url, formData, {
            withCredentials: false,
            headers: {

                'X-CSRFToken': csrfToken
            },

        })
            .then((response) => {
                console.log(response.data);
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    telephone: '',
                    password: '',
                });
                setIsRegistering(false);
                const { firstName, lastName } = formData;
                setIsPopupVisible(`Welcome, ${firstName} ${lastName}! Redirecting to login page in 5 seconds...`);


            })


            .catch((error) => {
                console.error(error);
                // Handle any errors that occurred during the form submission
                if (error.response && error.response.status === 400) {
                    setError(error.response.data.error);
                } else {
                    setError("An error occurred during registration.");
                }
                setIsRegistering(false);
            });



    };

    return (
        <>
            <div className="py-4 px-4 font-serif">
                <div className="container mx-auto">
                    <nav className="text-sm">
                        <Link href="/"
                            className="text-blue-600">Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-600">About</span>
                    </nav>
                </div>
            </div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="container mx-auto flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-8">
                        <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="firstName"
                                    >
                                        First Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name" required
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="lastName"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        required
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-2">{error}</p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Telephone
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="telephone"
                                    type="tel"
                                    placeholder="Telephone"
                                    required
                                    value={formData.telephone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button
                                className="inline-flex items-center ml-auto text-white font-bold bg-black hover:bg-gray-500 focus:ring-4 font-serif focus:outline-none focus:ring-blue-300 rounded-full text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="submit" disabled={isRegistering}
                            >
                                {isRegistering ? "Registering..." : "Sign Up"}
                            </button>
                        </form>
                        <p className="text-center mt-4 text-sm text-gray-600">
                            Already have an account?{" "}
                            <a href="./login" className="text-blue-500 underline">
                                Log in here
                            </a>
                        </p>
                    </div>
                    <div className="md:w-1/2 p-8 bg-gray-200">
                        <h2 className="text-2xl font-bold mb-4">Why Sign Up?</h2>
                        <ul className="list-disc list-inside">
                            <li>Access exclusive classic car listings.</li>
                            <li>Connect with fellow classic car enthusiasts.</li>
                            <li>Receive updates on upcoming events and auctions.</li>
                            <li>Participate in community discussions and forums.</li>
                            <li>Get expert advice on classic car restoration and maintenance.</li>
                        </ul>
                    </div>
                </div>


            </div>
            {/* Popup message */}
            {isPopupVisible && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-75 bg-white text-black text-xl font-bold">
                    <div className="bg-green-200 p-4 rounded-lg shadow-lg">
                        {isPopupVisible}
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
};

export default RegisterScreen;

