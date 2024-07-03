import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiBell, FiUserX, FiUserCheck } from 'react-icons/fi';

const SettingsPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to load users');
        }
    };

    const handleNotify = async (userId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/users/${userId}/notify/`);
            alert('Notification sent successfully');
        } catch (error) {
            console.error('Error sending notification:', error);
            setError('Failed to send notification');
        }
    };

    const handleSuspend = async (userId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/users/${userId}/suspend/`);
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error('Error suspending user:', error);
            setError('Failed to suspend user');
        }
    };

    const handleActivate = async (userId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/users/${userId}/activate/`);
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error('Error activating user:', error);
            setError('Failed to activate user');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">User Management</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {user.is_active ? 'Active' : 'Suspended'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => handleNotify(user.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        <FiBell className="inline-block mr-1" /> Notify
                                    </button>
                                    {user.is_active ? (
                                        <button onClick={() => handleSuspend(user.id)} className="text-red-600 hover:text-red-900 mr-4">
                                            <FiUserX className="inline-block mr-1" /> Suspend
                                        </button>
                                    ) : (
                                        <button onClick={() => handleActivate(user.id)} className="text-green-600 hover:text-green-900 mr-4">
                                            <FiUserCheck className="inline-block mr-1" /> Activate
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SettingsPage;