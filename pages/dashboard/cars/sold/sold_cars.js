import React, { useState, useEffect } from 'react';
import { FiFilter, FiDownload, FiEye, FiTruck, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';

const CarsSoldPage = () => {
    const [soldCars, setSoldCars] = useState([]);
    const [underEvaluation, setUnderEvaluation] = useState([]);
    const [suspended, setSuspended] = useState([]);
    const [underPickup, setUnderPickup] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [countySales, setCountySales] = useState({});
    const [totalCommission, setTotalCommission] = useState(0);
    const [activeTab, setActiveTab] = useState('sold');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [soldResponse, evaluationResponse, suspendedResponse, pickupResponse, transactionsResponse, countySalesResponse] = await Promise.all([
                axios.get('http://127.0.0.1:8000/cars/sold'),
                axios.get('http://127.0.0.1:8000/cars/under-evaluation'),
                axios.get('http://127.0.0.1:8000/cars/suspended'),
                axios.get('http://127.0.0.1:8000/cars/under-pickup'),
                axios.get('http://127.0.0.1:8000/transactions'),
                axios.get('http://127.0.0.1:8000/county-sales'),
            ]);

            setSoldCars(soldResponse.data);
            setUnderEvaluation(evaluationResponse.data);
            setSuspended(suspendedResponse.data);
            setUnderPickup(pickupResponse.data);
            setTransactions(transactionsResponse.data);
            setCountySales(countySalesResponse.data);

            const commission = soldResponse.data.reduce((acc, car) => acc + car.commission, 0);
            setTotalCommission(commission);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch data. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderCarList = (cars) => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-2 sm:px-6 text-left">Car Model</th>
                        <th className="py-3 px-2 sm:px-6 text-left">Price</th>
                        <th className="py-3 px-2 sm:px-6 text-left hidden sm:table-cell">Date</th>
                        <th className="py-3 px-2 sm:px-6 text-left hidden md:table-cell">Status</th>
                        <th className="py-3 px-2 sm:px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {cars.map((car) => (
                        <tr key={car.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-2 sm:px-6 text-left whitespace-nowrap">{car.model}</td>
                            <td className="py-3 px-2 sm:px-6 text-left">${car.price.toLocaleString()}</td>
                            <td className="py-3 px-2 sm:px-6 text-left hidden sm:table-cell">{new Date(car.date).toLocaleDateString()}</td>
                            <td className="py-3 px-2 sm:px-6 text-left hidden md:table-cell">{car.status}</td>
                            <td className="py-3 px-2 sm:px-6 text-left">
                                <button className="text-blue-600 hover:text-blue-900"><FiEye /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderTransactions = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-2 sm:px-6 text-left">Car Model</th>
                        <th className="py-3 px-2 sm:px-6 text-left hidden sm:table-cell">Buyer</th>
                        <th className="py-3 px-2 sm:px-6 text-left hidden md:table-cell">Seller</th>
                        <th className="py-3 px-2 sm:px-6 text-left">Price</th>
                        <th className="py-3 px-2 sm:px-6 text-left hidden lg:table-cell">Date</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-2 sm:px-6 text-left whitespace-nowrap">{transaction.carModel}</td>
                            <td className="py-3 px-2 sm:px-6 text-left hidden sm:table-cell">{transaction.buyer}</td>
                            <td className="py-3 px-2 sm:px-6 text-left hidden md:table-cell">{transaction.seller}</td>
                            <td className="py-3 px-2 sm:px-6 text-left">${transaction.price.toLocaleString()}</td>
                            <td className="py-3 px-2 sm:px-6 text-left hidden lg:table-cell">{new Date(transaction.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold mb-4 sm:mb-0">Cars Sold</h1>
                <div className="flex space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <FiFilter className="inline-block mr-2" /> Filter
                    </button>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        <FiDownload className="inline-block mr-2" /> Export
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row mb-8">
                <div className="w-full lg:w-3/4 lg:pr-8 mb-8 lg:mb-0">
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Overview</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-blue-100 p-4 rounded-lg">
                                <h3 className="text-base font-semibold">Total Cars Sold</h3>
                                <p className="text-2xl font-bold">{soldCars.length}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg">
                                <h3 className="text-base font-semibold">Total Commission</h3>
                                <p className="text-2xl font-bold">${totalCommission.toLocaleString()}</p>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg">
                                <h3 className="text-base font-semibold">Under Evaluation</h3>
                                <p className="text-2xl font-bold">{underEvaluation.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex flex-wrap mb-4">
                            {['sold', 'evaluation', 'suspended', 'pickup', 'transactions'].map((tab) => (
                                <button
                                    key={tab}
                                    className={`mr-4 mb-2 ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        {isLoading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <>
                                {activeTab === 'sold' && renderCarList(soldCars)}
                                {activeTab === 'evaluation' && renderCarList(underEvaluation)}
                                {activeTab === 'suspended' && renderCarList(suspended)}
                                {activeTab === 'pickup' && renderCarList(underPickup)}
                                {activeTab === 'transactions' && renderTransactions()}
                            </>
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-1/4">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">County Sales</h2>
                        <ul>
                            {Object.entries(countySales).map(([county, count]) => (
                                <li key={county} className="flex justify-between items-center mb-2">
                                    <span>{county}</span>
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarsSoldPage;