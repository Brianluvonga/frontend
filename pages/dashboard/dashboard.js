import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiCalendar, FiDollarSign, FiTruck, FiTool, FiCheckCircle, FiUser, FiLogOut, FiSettings, FiUsers, FiHelpCircle, FiInfo, FiBell } from 'react-icons/fi';
import UserListTable from './user_list'
import UserPage from './users/users_page';
import Payments from './payments/payments_page';
import Sold from './cars/sold/sold_cars';
import Rebuilds from './cars/rebuild/car_rebuilds';
import Restored from './cars/fully_restored/full_restored';

import axios from 'axios';

const Dashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
    const [isUserPopupOpen, setIsUserPopupOpen] = useState(false);
    const [currentView, setCurrentView] = useState('dashboard');
    const [userCount, setUserCount] = useState(0);
    const [userCountError, setUserCountError] = useState(null);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 640px)');

        const handleMediaQueryChange = (e) => {
            if (e.matches) {
                setIsMenuOpen(false);
            }
        };

        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    useEffect(() => {
        const fetchUserCount = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/count/');
                setUserCount(response.data.total_users);
            } catch (error) {
                console.error('Error fetching user count:', error);
                setUserCountError('Failed to fetch user count');
            }
        };

        fetchUserCount();
    }, [])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleUserCardClick = () => {
        setIsUserPopupOpen(true);
    };

    const closeUserPopup = () => {
        setIsUserPopupOpen(false);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
        setIsNotificationMenuOpen(false);
    };

    const toggleNotificationMenu = () => {
        setIsNotificationMenuOpen(!isNotificationMenuOpen);
        setIsUserMenuOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Collapsible Sidebar */}
            <div className={`bg-black text-white ${isMenuOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
                <div className="p-4 flex justify-between items-center">
                    <h2 href="/dashboard" className={`font-bold ${isMenuOpen ? 'block' : 'hidden'}`}>Classic Cars</h2>
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
                <nav className="mt-8">
                    <NavItem icon={<FiTool />} text="Build Car" isOpen={isMenuOpen} onClick={() => setCurrentView('rebuilds')} />
                    <NavItem icon={<FiTruck />} text="Restored" isOpen={isMenuOpen} onClick={() => setCurrentView('restored')} />
                    <NavItem icon={<FiCheckCircle />} text="Sold" isOpen={isMenuOpen} onClick={() => setCurrentView('sold')} />
                    <NavItem icon={<FiDollarSign />} text="Payments" isOpen={isMenuOpen} onClick={() => setCurrentView('payments')} />
                    <NavItem icon={<FiUsers />} text="Users" isOpen={isMenuOpen} onClick={() => setCurrentView('users')} />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-x-hidden overflow-y-auto">
                <header className="bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center">
                        <div className="relative mr-4">
                            <button
                                onClick={toggleNotificationMenu}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 focus:outline-none"
                            >
                                <FiBell size={24} className="text-gray-600 hover:text-gray-800" />
                            </button>
                            {isNotificationMenuOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        New message from user
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Car sale completed
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        New bid placed
                                    </a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={toggleUserMenu}
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 focus:outline-none"
                            >
                                <FiUser size={24} className="text-gray-600 hover:text-gray-800" />
                            </button>
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <FiUser className="inline-block mr-2" /> Profile
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <FiSettings className="inline-block mr-2" /> Settings
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <FiLogOut className="inline-block mr-2" /> Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    {currentView === 'dashboard' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <DashboardCard title="Total Cars" value="1,234" />
                            <DashboardCard title="Cars Sold" value="789" />
                            <DashboardCard title="Revenue" value="$1,234,567" />
                            <DashboardCard title="Active Bids" value="42" />
                            <DashboardCard title="Total Users" value={userCount} onClick={handleUserCardClick} />
                            <UserListPopup isOpen={isUserPopupOpen} onClose={closeUserPopup}>
                                <UserListTable />
                            </UserListPopup>
                            <DashboardCard title="Buyers" value="321" />

                            <div className="col-span-full lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4">Calendar</h2>
                                <div className="bg-gray-200 h-64 flex items-center justify-center">
                                    Calendar Placeholder
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4">Upcoming Schedules</h2>
                                <ul>
                                    <ScheduleItem title="Client Meeting" time="2:00 PM" />
                                    <ScheduleItem title="Car Auction" time="5:00 PM" />
                                    <ScheduleItem title="Team Briefing" time="9:00 AM" />
                                </ul>
                            </div>

                            <div className="col-span-full bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
                                <ul>
                                    <ActivityItem title="New car listed" time="2 hours ago" />
                                    <ActivityItem title="Payment received" time="5 hours ago" />
                                    <ActivityItem title="Car sold" time="1 day ago" />
                                </ul>
                            </div>
                        </div>
                    ) : currentView === 'users' ? (
                        <UserPage />
                    ) : currentView === 'payments' ? (
                        <Payments />
                    ) : currentView === 'sold' ? (
                        <Sold />
                    ) : currentView === 'rebuilds' ? (
                        <Rebuilds />
                    ) : currentView === 'restored' ? (
                        <Restored />
                    ) : null}
                </main>
            </div>
        </div>
    );
};

const NavItem = ({ icon, text, isOpen, onClick }) => (
    <a href="#" className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-200" onClick={onClick}>
        {icon}
        <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>{text}</span>
    </a>
);

const DashboardCard = ({ title, value, onClick }) => (
    <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
        onClick={onClick}
    >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
    </div>
);

const ScheduleItem = ({ title, time }) => (
    <li className="mb-2 flex justify-between items-center">
        <span>{title}</span>
        <span className="text-sm text-gray-500">{time}</span>
    </li>
);

const ActivityItem = ({ title, time }) => (
    <li className="mb-2 flex justify-between items-center">
        <span>{title}</span>
        <span className="text-sm text-gray-500">{time}</span>
    </li>
);

const UserListPopup = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">User List</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FiX size={24} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Dashboard;