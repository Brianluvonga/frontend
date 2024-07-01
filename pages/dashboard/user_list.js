import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserListTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    const fetchUsers = async (page) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/users/?page=${page}`);
            console.log('API response:', response.data);  // Log the response
            if (Array.isArray(response.data.results)) {
                setUsers(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 items per page
            } else {
                setError('Unexpected data format received from the server.');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users. Please try again later.');
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="mt-8">
            {/* <h2 className="text-2xl font-bold mb-4">User List</h2> */}
            {Array.isArray(users) && users.length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            {/* <th className="py-2 px-4 border-b text-left">ID</th> */}
                            <th className="py-2 px-4 border-b text-left text-sm">First Name</th>
                            <th className="py-2 px-4 border-b text-left text-sm">Last Name</th>
                            <th className="py-2 px-4 border-b text-left text-sm">Email</th>
                            <th className="py-2 px-4 border-b text-left text-sm">Telephone</th>
                            <th className="py-2 px-4 border-b text-left text-sm">Role</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                {/* <td className="py-2 px-4 border-b">{user.id}</td> */}
                                <td className="py-2 px-4 border-b text-sm">{user.firstName}</td>
                                <td className="py-2 px-4 border-b text-sm">{user.lastName}</td>
                                <td className="py-2 px-4 border-b text-sm">{user.email}</td>
                                <td className="py-2 px-4 border-b text-sm">{user.telephone}</td>
                                <td className="py-2 px-4 border-b text-sm">{user.role}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
            <div className="mt-4 flex justify-between">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserListTable;