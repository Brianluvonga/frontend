import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            console.log('Fetching data for userId:', userId);

            if (userId) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/user/${userId}/`);
                    const data = response.data;
                    setUserData(data);
                    console.log('User data fetched:', data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError('Error fetching user data. Please try again later.');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
                setError('No user ID provided');
            }
        };

        fetchUserData();
    }, [userId]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500 p-4">{error}</div>;
    }

    if (!userData) {
        return <div className="text-center text-gray-500 p-4">No data available</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="bg-cover bg-center h-64" style={{ backgroundImage: "url('https://via.placeholder.com/800x300')" }}></div>
                <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 -mt-20">
                            <img className="h-24 w-24 rounded-full border-4 border-white" src="https://via.placeholder.com/150" alt="Profile" />
                        </div>
                        <div className="ml-6">
                            <h1 className="text-2xl font-bold text-gray-900">{userData.firstName} {userData.lastName}</h1>
                            <p className="text-sm font-medium text-gray-500">{userData.email}</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Full name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.firstName} {userData.lastName}</dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.email}</dd>
                        </div>
                        {/* Add more user details here */}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Profile;