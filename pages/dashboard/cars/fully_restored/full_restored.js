import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiTruck, FiBarChart2, FiPackage, FiSearch, FiEye } from 'react-icons/fi';
import axios from 'axios';

const BuiltCarsPage = () => {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [overview, setOverview] = useState({
        totalCars: 0,
        newPostings: 0,
        carsSold: 0
    });

    const [salesMetrics, setSalesMetrics] = useState({
        profitMargin: 0,
        avgSalePrice: 0,
        revenue: 0
    });

    const [inventory, setInventory] = useState({
        stockLevels: 0,
        lowStockAlert: 0,
        incomingStock: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [carsResponse, overviewResponse, salesResponse, inventoryResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8000/cars/built'),
                axios.get('http://127.0.0.1:8000/cars/overview'),
                axios.get('http://127.0.0.1:8000/cars/sales-metrics'),
                axios.get('http://127.0.0.1:8000/cars/inventory')
            ]);

            setCars(carsResponse.data);
            setOverview(overviewResponse.data);
            setSalesMetrics(salesResponse.data);
            setInventory(inventoryResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredCars = cars.filter(car =>
        car.make.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm)
    );

    const StatCard = ({ icon, title, value, color }) => (
        <div className={`bg-${color}-100 p-6 rounded-lg shadow-md`}>
            <div className="flex items-center">
                <div className={`bg-${color}-200 rounded-full p-3 mr-4`}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8 text-gray-800">Built Cars Dashboard</h1>

            {/* Overview Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={<FiTruck className="text-blue-500" size={24} />}
                        title="Total Cars"
                        value={overview.totalCars}
                        color="blue"
                    />
                    <StatCard
                        icon={<FiBarChart2 className="text-green-500" size={24} />}
                        title="New Postings"
                        value={overview.newPostings}
                        color="green"
                    />
                    <StatCard
                        icon={<FiDollarSign className="text-purple-500" size={24} />}
                        title="Cars Sold"
                        value={overview.carsSold}
                        color="purple"
                    />
                </div>
            </section>

            {/* Car Listings Section */}
            <section className="mb-12">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700">Car Listings</h2>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search cars..."
                            className="pl-10 pr-4 py-2 border rounded-lg"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCars.map(car => (
                            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2">{car.make} {car.model}</h3>
                                    <p className="text-gray-600 mb-2">Year: {car.year}</p>
                                    <p className="text-gray-600 mb-2">Price: ${car.price.toLocaleString()}</p>
                                    <div className="flex justify-between items-center">
                                        <span className={`px-2 py-1 rounded-full text-sm ${car.status === 'Available' ? 'bg-green-200 text-green-800' :
                                                car.status === 'Sold' ? 'bg-red-200 text-red-800' :
                                                    'bg-yellow-200 text-yellow-800'
                                            }`}>
                                            {car.status}
                                        </span>
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <FiEye size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Sales Metrics Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sales Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={<FiDollarSign className="text-green-500" size={24} />}
                        title="Profit Margin"
                        value={`${salesMetrics.profitMargin}%`}
                        color="green"
                    />
                    <StatCard
                        icon={<FiBarChart2 className="text-blue-500" size={24} />}
                        title="Avg. Sale Price"
                        value={`$${salesMetrics.avgSalePrice.toLocaleString()}`}
                        color="blue"
                    />
                    <StatCard
                        icon={<FiDollarSign className="text-purple-500" size={24} />}
                        title="Revenue"
                        value={`$${salesMetrics.revenue.toLocaleString()}`}
                        color="purple"
                    />
                </div>
            </section>

            {/* Inventory Section */}
            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Inventory</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={<FiPackage className="text-blue-500" size={24} />}
                        title="Stock Levels"
                        value={inventory.stockLevels}
                        color="blue"
                    />
                    <StatCard
                        icon={<FiBarChart2 className="text-yellow-500" size={24} />}
                        title="Low Stock Alert"
                        value={inventory.lowStockAlert}
                        color="yellow"
                    />
                    <StatCard
                        icon={<FiTruck className="text-green-500" size={24} />}
                        title="Incoming Stock"
                        value={inventory.incomingStock}
                        color="green"
                    />
                </div>
            </section>
        </div>
    );
};

export default BuiltCarsPage;