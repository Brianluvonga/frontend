import React from "react";
import 'tailwindcss/tailwind.css';
import Link from 'next/link';

import Footer from 'pages/footer/Footer';



const LoginScreen = () => {
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
            <div className="flex items-center justify-center min-h-screen font-serif">
                <div className="container mx-auto flex flex-col md:flex-row">
                    <div className="md:w-1/2 p-8 bg-gray-200 rounded-l-lg">
                        <h2 className="text-2xl font-bold mb-4">Why Log In?</h2>
                        <ul className="list-disc list-inside">
                            <li>Access exclusive features and content.</li>
                            <li>Manage your profile and preferences.</li>
                            <li>Interact with other users and participate in discussions.</li>
                            <li>Save and bookmark your favorite items or resources.</li>
                            <li>Stay updated with the latest news and announcements.</li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 p-8">
                        <div className="bg-gray-50 rounded-r-lg shadow-lg p-8">
                            <h1 className="text-4xl font-bold mb-4 text-center">Log In</h1>
                            <form>
                                <div className="mb-4">
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email"
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
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <button
                                    className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                    type="submit"
                                >
                                    Log In
                                </button>
                            </form>
                            <p className="text-center mt-4 text-sm text-gray-600">
                                Don't have an account?{" "}
                                <a href="./register" className="text-blue-500 underline">
                                    Sign up here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    );
};

export default LoginScreen;
