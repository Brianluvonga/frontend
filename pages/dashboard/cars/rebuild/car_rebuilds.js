import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit, FiTrash2, FiFlag, FiEye } from 'react-icons/fi';
import axios from 'axios';
import CarDetailsPopup from './car_detail';

const API_BASE_URL = 'http://127.0.0.1:8000';

const RebuildCarsPage = () => {
    const [carParts, setCarParts] = useState([]);
    const [filteredCarParts, setFilteredCarParts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        lowStock: 0,
        flagged: 0
    });
    const [selectedPart, setSelectedPart] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/parts/car_parts/`);
            setCarParts(response.data);
            setFilteredCarParts(response.data);
            updateStats(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const updateStats = (partsData) => {
        const lowStock = partsData.filter(part => part.quantity < 10).length;
        const flagged = partsData.filter(part => part.flagged).length;
        setStats({
            total: partsData.length,
            lowStock,
            flagged
        });
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = carParts.filter(part =>
            part.part_name.toLowerCase().includes(term) ||
            part.manufacturer.toLowerCase().includes(term) ||
            part.model.toLowerCase().includes(term)
        );
        setFilteredCarParts(filtered);
    };

    const handleEdit = (id) => {
        // Implement edit functionality
        console.log(`Edit part with id: ${id}`);
        // You might want to open a modal or navigate to an edit page here
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this part?");
        if (isConfirmed) {
            try {
                await axios.delete(`${API_BASE_URL}/parts/car_parts/${id}/`);
                const updatedParts = carParts.filter(part => part.id !== id);
                setCarParts(updatedParts);
                setFilteredCarParts(updatedParts);
                updateStats(updatedParts);
            } catch (error) {
                console.error('Error deleting part:', error);
                setError('Failed to delete part. Please try again.');
            }
        }
    };

    const handleFlag = async (id) => {
        const part = carParts.find(p => p.id === id);
        const action = part.flagged ? "unflag" : "flag";
        const isConfirmed = window.confirm(`Are you sure you want to ${action} this part?`);
        if (isConfirmed) {
            try {
                const response = await axios.put(`${API_BASE_URL}/parts/car_parts/${id}/flag/`);
                const updatedPart = response.data;
                const updatedParts = carParts.map(p => p.id === id ? updatedPart : p);
                setCarParts(updatedParts);
                setFilteredCarParts(updatedParts);
                updateStats(updatedParts);
            } catch (error) {
                console.error('Error flagging part:', error);
                setError(`Failed to ${action} part. Please try again.`);
            }
        }
    };

    const handleView = (id) => {
        const part = carParts.find(p => p.id === id);
        setSelectedPart(part);
    };

    const closePopup = () => {
        setSelectedPart(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Car Parts</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">Total Parts</h3>
                    <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">Low Stock</h3>
                    <p className="text-3xl font-bold">{stats.lowStock}</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold">Flagged Parts</h3>
                    <p className="text-3xl font-bold">{stats.flagged}</p>
                </div>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search parts..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                <th className="py-3 px-2 text-left">Image</th>
                                <th className="py-3 px-2 text-left">Part Name</th>
                                <th className="py-3 px-2 text-left">Manufacturer</th>
                                <th className="py-3 px-2 text-left">Model</th>
                                <th className="py-3 px-2 text-left">Price</th>
                                <th className="py-3 px-2 text-left">Quantity</th>
                                <th className="py-3 px-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {filteredCarParts.map((part) => (
                                <tr key={part.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-2 text-left">
                                        <img src={part.image} alt={part.part_name} className="w-16 h-16 object-cover rounded" />
                                    </td>
                                    <td className="py-3 px-2 text-left">{part.part_name}</td>
                                    <td className="py-3 px-2 text-left">{part.manufacturer}</td>
                                    <td className="py-3 px-2 text-left">{part.model}</td>
                                    <td className="py-3 px-2 text-left">Kshs. {part.price}</td>
                                    <td className="py-3 px-2 text-left">{part.quantity}</td>
                                    <td className="py-3 px-2 text-left">
                                        <div className="flex items-center space-x-4">
                                            <button onClick={() => handleView(part.id)} className="text-blue-600 hover:text-blue-900">
                                                <FiEye />
                                            </button>
                                            <button onClick={() => handleEdit(part.id)} className="text-green-600 hover:text-green-900">
                                                <FiEdit />
                                            </button>
                                            <button onClick={() => handleDelete(part.id)} className="text-red-600 hover:text-red-900">
                                                <FiTrash2 />
                                            </button>
                                            <button onClick={() => handleFlag(part.id)} className={`${part.flagged ? 'text-yellow-600' : 'text-gray-600'} hover:text-yellow-900`}>
                                                <FiFlag />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {selectedPart && (
                <CarDetailsPopup part={selectedPart} onClose={closePopup} />
            )}
        </div>
    );
};

export default RebuildCarsPage;