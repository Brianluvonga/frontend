import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CarDashboard() {
    const [cars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100000]);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/rebuild/car_parts/');
            console.log('API Response', response.data)
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const filteredCars = cars.filter(car =>
        (searchTerm === '' || car.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedCategories.length === 0 || selectedCategories.includes(car.category)) &&
        (car.price >= priceRange[0] && car.price <= priceRange[1]) &&
        (activeTab === 'all' || car.type === activeTab)
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search for cars..."
                        className="w-full p-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Tab Buttons */}
                <div className="flex justify-center mb-4">
                    {['all', 'new', 'rebuild'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`mx-2 px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${activeTab === tab
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-100'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)} Cars
                        </button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Filters</h2>
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Categories</h3>
                            <div className="space-y-2">
                                {Array.from(new Set(cars.map(car => car.category))).map((category) => (
                                    <label key={category} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        {category}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Price Range</h3>
                            <input
                                type="range"
                                min="0"
                                max="100000"
                                step="1000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                className="w-full"
                            />
                            <div className="flex justify-between">
                                <span>${priceRange[0].toLocaleString()}</span>
                                <span>${priceRange[1].toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-grow">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCars.map((car) => (
                                <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img src={car.image} alt='' className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                                        <p className="text-gray-600 mb-2">{car.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-2xl font-bold text-blue-600">${car.price.toLocaleString()}</span>
                                            <span className="text-sm text-gray-500">{car.location}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">Seller: {car.seller}</p>
                                        {car.type === 'rebuild' && (
                                            <p className="text-sm text-red-500 mt-2">Estimated Rebuild Cost: ${car.rebuild_cost?.toLocaleString()}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}