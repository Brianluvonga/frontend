import React, { useState, useEffect } from 'react';
import { FiDownload, FiEdit, FiTrash2, FiLock, FiUnlock } from 'react-icons/fi';
import axios from 'axios';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBuyers, setTotalBuyers] = useState(0);
    const [totalSellers, setTotalSellers] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statsError, setStatsError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        fetchUsers();
        fetchUserStats();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://127.0.0.1:8000/users/');
            console.log('API response:', response.data);
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else if (response.data && Array.isArray(response.data.results)) {
                setUsers(response.data.results);
            } else {
                throw new Error('Unexpected data format');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users. Please try again later.');
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserStats = async () => {
        setStatsError(null);
        try {
            const response = await axios.get('http://127.0.0.1:8000/users/stats/');
            console.log('Stats response:', response.data);
            setTotalUsers(response.data.total_users || 0);
            setTotalBuyers(response.data.total_buyers || 0);
            setTotalSellers(response.data.total_sellers || 0);
        } catch (error) {
            console.error('Error fetching user stats:', error);
            setStatsError('Failed to fetch user statistics');
        }
    };

    const generateCSV = (data) => {
        const headers = ['First Name', 'Last Name', 'Email', 'Telephone', 'Role'];
        const csvRows = [
            headers.join(','),
            ...data.map(user =>
                [
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.telephone,
                    user.role
                ].join(',')
            )
        ];
        return csvRows.join('\n');
    };

    const [isExporting, setIsExporting] = useState(false);

    const exportToCSV = async () => {
        setIsExporting(true);
        try {
            // If you need to fetch fresh data before exporting, uncomment the next line
            // await fetchUsers();
            const csvContent = generateCSV(users);
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'users_export.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Error exporting CSV:', error);
            // Optionally, show an error message to the user
        } finally {
            setIsExporting(false);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesFilter = activeFilter === 'all' || user.role.toLowerCase() === activeFilter;
        const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || user.telephone.includes(searchTerm)
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };


    const [updateForm, setUpdateForm] = useState({ isOpen: false, user: null });
    const handleOpenUpdateForm = (user) => {
        setUpdateForm({ isOpen: true, user: { ...user } });
    };

    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateForm(prev => ({
            ...prev,
            user: { ...prev.user, [name]: value }
        }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/user/${updateForm.user.id}/`, updateForm.user);
            if (response.status === 200) {
                setUsers(users.map(user => user.id === updateForm.user.id ? response.data : user));
                setUpdateForm({ isOpen: false, user: null });
                alert('User updated successfully');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user. Please try again.');
        }
    };
    const handleUserUpdate = (userId) => {
        // Implement user update logic
        console.log('Updating user:', userId);
    };


    const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, userId: null });

    const handleUserDelete = async (userId) => {
        setDeleteConfirmation({ isOpen: true, userId });
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/user/${deleteConfirmation.userId}/`);
            if (response.status === 204) {
                // Remove the user from the local state
                setUsers(users.filter(user => user.id !== deleteConfirmation.userId));
                // Show a success message
                alert('User deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again.');
        } finally {
            setDeleteConfirmation({ isOpen: false, userId: null });
        }
    };

    const cancelDelete = () => {
        setDeleteConfirmation({ isOpen: false, userId: null });
    };

    const handleUserBlock = (userId, isBlocked) => {
        // Implement user block/unblock logic
        console.log('Blocking/Unblocking user:', userId, isBlocked);
    };



    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Users</h1>
                <button
                    onClick={exportToCSV}
                    className="bg-black text-white px-4 py-2 rounded flex items-center"
                    disabled={isExporting}
                >
                    {isExporting ? (
                        <>
                            <span className="mr-2">Exporting...</span>
                            {/* You can add a loading spinner here if you want */}
                        </>
                    ) : (
                        <>
                            <FiDownload className="mr-2" /> Export to CSV
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {statsError ? (
                    <div className="col-span-3 bg-red-100 text-red-700 p-4 rounded">{statsError}</div>
                ) : (
                    <>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">Total Users</h2>
                            <p className="text-2xl font-bold">{totalUsers}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">Total Buyers</h2>
                            <p className="text-2xl font-bold">{totalBuyers}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-lg font-semibold">Total Sellers</h2>
                            <p className="text-2xl font-bold">{totalSellers}</p>
                        </div>
                    </>
                )}
            </div>

            <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveFilter('all')}
                        className={`px-4 py-2 text-sm rounded ${activeFilter === 'all' ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveFilter('buyer')}
                        className={`px-4 py-2 text-sm rounded ${activeFilter === 'buyer' ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        Buyers
                    </button>
                    <button
                        onClick={() => setActiveFilter('seller')}
                        className={`px-4 py-2 text-sm rounded ${activeFilter === 'seller' ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        Sellers
                    </button>
                    <button
                        onClick={() => setActiveFilter('general')}
                        className={`px-4 py-2 text-sm rounded ${activeFilter === 'general' ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        General
                    </button>
                </div>
                <div className="relative w-full sm:w-64 md:w-80">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded shadow overflow-x-auto">
                {isLoading ? (
                    <div className="text-center p-4">Loading users...</div>
                ) : error ? (
                    <div className="text-center p-4 text-red-500">{error}</div>
                ) : (
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 text-left">Select</th>
                                <th className="p-2 text-left">FirstName</th>
                                <th className="p-2 text-left">LastName</th>
                                <th className="p-2 text-left">Email</th>
                                <th className="p-2 text-left">Telephone</th>
                                <th className="p-2 text-left">Role</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-t">
                                        <td className="p-2">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleUserSelect(user)}
                                                checked={selectedUser && selectedUser.id === user.id}
                                            />
                                        </td>
                                        <td className="p-2 text-sm">{user.firstName}</td>
                                        <td className="p-2 text-sm">{user.lastName}</td>

                                        <td className="p-2 text-sm">{user.email}</td>
                                        <td className="p-2 text-sm">{user.telephone}</td>

                                        <td className="p-2 text-sm">{user.role}</td>
                                        <td className="p-2 text-sm">
                                            <button onClick={() => handleOpenUpdateForm(user)} className="mr-2">
                                                <FiEdit />
                                            </button>
                                            <button onClick={() => handleUserDelete(user.id)} className="mr-2">
                                                <FiTrash2 />
                                            </button>
                                            <button onClick={() => handleUserBlock(user.id, !user.isBlocked)}>
                                                {user.isBlocked ? <FiUnlock /> : <FiLock />}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="p-2 text-center">
                                        {users.length === 0 ? 'No users available' : 'No users match the current filter and search criteria'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {
                // selectedUser && (
                //     <div className="mt-6 bg-white p-4 rounded shadow">
                //         <h2 className="text-xl font-bold mb-4">User Details</h2>
                //         <p><strong>Name:</strong> {selectedUser.name}</p>
                //         <p><strong>Email:</strong> {selectedUser.email}</p>
                //         <p><strong>Role:</strong> {selectedUser.role}</p>
                //         {/* Add more user details as needed */}
                //     </div>
                // )
            }

            {deleteConfirmation.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-4">Are you sure you want to delete this user? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {updateForm.isOpen && updateForm.user && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Update User</h2>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={updateForm.user.firstName}
                                    onChange={handleUpdateInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={updateForm.user.lastName}
                                    onChange={handleUpdateInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={updateForm.user.email}
                                    onChange={handleUpdateInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Telephone</label>
                                <input
                                    type="tel"
                                    name="telephone"
                                    value={updateForm.user.telephone}
                                    onChange={handleUpdateInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    name="role"
                                    value={updateForm.user.role}
                                    onChange={handleUpdateInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                    <option value="general">General</option>

                                </select>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setUpdateForm({ isOpen: false, user: null })}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;