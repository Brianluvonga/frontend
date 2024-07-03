import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/profile/');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to load user data');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://127.0.0.1:8000/api/user/change-password/', { password });
            setSuccessMessage('Password updated successfully');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error updating password:', error);
            setError('Failed to update password');
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://127.0.0.1:8000/api/user/profile/', user);
            setSuccessMessage('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile');
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* User Image Card */}
                <div className="bg-white shadow rounded-lg mb-6 p-6">
                    <div className="flex justify-center">
                        <img
                            src={user.profile_image || 'https://via.placeholder.com/150'}
                            alt="Profile"
                            className="w-32 h-32 rounded-full"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-center mt-4">{user.username}</h2>
                </div>

                {/* User Details Form */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
                    <form onSubmit={handleProfileUpdate}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    value={user.first_name}
                                    onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    value={user.last_name}
                                    onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Update Profile
                            </button>
                        </div>
                    </form>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Change Password</h3>
                    <form onSubmit={handlePasswordChange}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>

                {error && <p className="text-red-500 mt-4">{error}</p>}
                {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            </div>
        </div>
    );
};

export default ProfilePage;

