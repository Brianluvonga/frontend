import React, { useState } from "react";
import 'tailwindcss/tailwind.css';
import Link from 'next/link';
import axios from 'axios';
import Footer from 'pages/footer/Footer';
import Profile from './user/profile';
import { useRouter } from 'next/router';


const LoginScreen = () => {

    const router = useRouter();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
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

    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/user/${userId}/`);
            const user = response.data;
            return user;  // Make sure to return the user data
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };


    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);

        try {
            const csrfToken = await getCSRFToken();
            const url = 'http://127.0.0.1:8000/api/login/';

            const response = await axios.post(url, loginData, {
                withCredentials: true,
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            });

            // Check if login was successful
            if (response.status === 200) {
                const userData = response.data; // Assuming the response contains user data

                // Log the entire userData object
                console.log("User data:", userData);

                setUserDetails(userData); // Assuming user data is directly available
                setLoginSuccess(true);

                // Log the user's ID
                console.log("User ID:", userData.id);

                // Fetch user details after successful login
                const user = await fetchUserDetails(userData.id);
                if (user) {
                    setUserDetails(user);
                    setLoginSuccess(true);
                    router.push('dashboard/dashboard');
                } else {
                    setLoginError('Error retrieving user details.');
                }
            } else {
                // Handle invalid response status
                setLoginError('Invalid response from server');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginError('Invalid email or password.');
        } finally {
            setIsLoggingIn(false);
        }
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
                        <span className="text-gray-600">Login</span>
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
                    <div className="md:w-1/2 p-8 ">
                        <div className="bg-gray-50 rounded-r-lg shadow-lg p-8">
                            <h1 className="text-4xl font-bold mb-4 text-center">Log In</h1>
                            <form onSubmit={handleLoginSubmit}>
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
                                        value={loginData.email}
                                        onChange={handleInputChange}
                                        required
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
                                        value={loginData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {loginError && (
                                    <p className="text-red-500 text-sm mb-4">{loginError}</p>
                                )}
                                <button
                                    className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                    type="submit"
                                    disabled={isLoggingIn}
                                >
                                    {isLoggingIn ? "Logging in..." : "Log In"}
                                </button>
                            </form>
                            {loginSuccess && (
                                <p className="text-green-500 text-sm mb-4">Login successful! Redirecting...</p>
                            )}

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

            {loginSuccess && userDetails && <Profile userId={userDetails.id} />}
            <Footer />
        </>
    );
};

export default LoginScreen;
