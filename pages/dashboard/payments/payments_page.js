import React, { useState, useEffect } from 'react';
import { FiDownload, FiEye, FiFilter, FiChevronUp, FiChevronDown, FiX } from 'react-icons/fi';
import axios from 'axios';

const PaymentsPage = () => {
    const [payments, setPayments] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [stats, setStats] = useState({
        totalPayments: 0,
        totalAmount: 0,
        refundedAmount: 0,
        reserveAmount: 0,
        approvedAmount: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statsError, setStatsError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handlePaymentSelect = (payment) => {
        setSelectedPayment(payment);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedPayment(null);
    };

    useEffect(() => {
        fetchPayments();
        fetchPaymentStats();
        fetchRecentTransactions();
    }, []);

    const fetchPayments = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://127.0.0.1:8000/payments/api/');
            const paymentsData = response.data.results || response.data;
            setPayments(Array.isArray(paymentsData) ? paymentsData : []);
        } catch (error) {
            console.error('Error fetching payments:', error);
            setError('Failed to fetch payments. Please try again later.');
            setPayments([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPaymentStats = async () => {
        setStatsError(null);
        try {
            const response = await axios.get('http://127.0.0.1:8000/payments/api/stats/');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching payment stats:', error);
            setStatsError('Failed to fetch payment statistics');
        }
    };

    const fetchRecentTransactions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/payments/api/recent/');
            setRecentTransactions(response.data.results || response.data);
        } catch (error) {
            console.error('Error fetching recent transactions:', error);
        }
    };

    const generateCSV = (data) => {
        const headers = ['ID', 'Amount', 'Date', 'Status', 'User'];
        const csvRows = [
            headers.join(','),
            ...data.map(payment =>
                [
                    payment.id,
                    payment.amount,
                    payment.date,
                    payment.status,
                    payment.user
                ].join(',')
            )
        ];
        return csvRows.join('\n');
    };

    const [isExporting, setIsExporting] = useState(false);

    const exportToCSV = async () => {
        setIsExporting(true);
        try {
            const csvContent = generateCSV(payments);
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'payments_export.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Error exporting CSV:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const filteredPayments = Array.isArray(payments) ? payments.filter(payment => {
        const matchesFilter = activeFilter === 'all' || payment.status.toLowerCase() === activeFilter;
        const matchesSearch = payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.id.toString().includes(searchTerm);
        const matchesDateRange = (!dateRange.start || new Date(payment.date) >= new Date(dateRange.start)) &&
            (!dateRange.end || new Date(payment.date) <= new Date(dateRange.end));
        return matchesFilter && matchesSearch && matchesDateRange;
    }) : [];

    const [selectedPayment, setSelectedPayment] = useState(null);

    // const handlePaymentSelect = (payment) => {
    //     setSelectedPayment(payment);
    // };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedTransactions = [...recentTransactions].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-bold">Payments</h1>
                <button
                    onClick={exportToCSV}
                    className="bg-black text-white px-4 py-2 rounded flex items-center"
                    disabled={isExporting}
                >
                    {isExporting ? 'Exporting...' : (
                        <>
                            <FiDownload className="mr-2" /> Export to CSV
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {statsError ? (
                    <div className="col-span-full bg-red-100 text-red-700 p-4 rounded">{statsError}</div>
                ) : (
                    <>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-base font-semibold">Total Payments</h2>
                            <p className="text-1xl font-bold">{stats.totalPayments}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-base font-semibold">Total Amount</h2>
                            <p className="text-1xl font-bold">${stats.totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-base font-semibold">Refunded Amount</h2>
                            <p className="text-1xl font-bold">${stats.refundedAmount.toFixed(2)}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-base font-semibold">Reserve Amount</h2>
                            <p className="text-1xl font-bold">${stats.reserveAmount.toFixed(2)}</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-base font-semibold">Approved Amount</h2>
                            <p className="text-1xl font-bold">${stats.approvedAmount.toFixed(2)}</p>
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
                        onClick={() => setActiveFilter('completed')}
                        className={`px-4 py-2 text-sm rounded ${activeFilter === 'completed' ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        Completed
                    </button>
                    <button
                        onClick={() => setActiveFilter('pending')}
                        className={`px-4 py-2 text-sm rounded ${activeFilter === 'pending' ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setActiveFilter('refunded')}
                        className={`px-4 py-2 text-sm rounded ${activeFilter === 'refunded' ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        Refunded
                    </button>
                </div>
                {/* <div className="flex gap-2">
                    <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                        className="border rounded p-2"
                    />
                    <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                        className="border rounded p-2"
                    />
                </div> */}
                <div className="relative w-full sm:w-64 md:w-80">
                    <input
                        type="text"
                        placeholder="Search payments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FiFilter className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded shadow overflow-x-auto mb-6">
                <h2 className="text-xl font-bold p-4">Recent Transactions</h2>
                <table className="w-full min-w-[640px]">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('id')}>
                                ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />)}
                            </th>
                            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('amount')}>
                                Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />)}
                            </th>
                            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('date')}>
                                Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />)}
                            </th>
                            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('status')}>
                                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />)}
                            </th>
                            <th className="p-2 text-left cursor-pointer" onClick={() => handleSort('user')}>
                                User {sortConfig.key === 'user' && (sortConfig.direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />)}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTransactions.map((transaction) => (
                            <tr key={transaction.id} className="border-t">
                                <td className="p-2 text-sm">{transaction.id}</td>
                                <td className="p-2 text-sm">${transaction.amount}</td>
                                <td className="p-2 text-sm">{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className="p-2 text-sm">{transaction.status}</td>
                                <td className="p-2 text-sm">{transaction.user}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white rounded shadow overflow-x-auto">
                <h2 className="text-xl font-bold p-4">All Payments</h2>
                {isLoading ? (
                    <div className="text-center p-4">Loading payments...</div>
                ) : error ? (
                    <div className="text-center p-4 text-red-500">{error}</div>
                ) : (
                    <table className="w-full min-w-[640px]">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 text-left">ID</th>
                                <th className="p-2 text-left">Amount</th>
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Status</th>
                                <th className="p-2 text-left">User</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.length > 0 ? (
                                filteredPayments.map((payment) => (
                                    <tr key={payment.id} className="border-t">
                                        <td className="p-2 text-sm">{payment.id}</td>
                                        <td className="p-2 text-sm">${payment.amount}</td>
                                        <td className="p-2 text-sm">{new Date(payment.date).toLocaleDateString()}</td>
                                        <td className="p-2 text-sm">{payment.status}</td>
                                        <td className="p-2 text-sm">{payment.user}</td>
                                        <td className="p-2 text-sm">
                                            <button onClick={() => handlePaymentSelect(payment)} className="mr-2">
                                                <FiEye />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-2 text-center">
                                        {payments.length === 0 ? 'No payments available' : 'No payments match the current filter and search criteria'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            {isPopupOpen && selectedPayment && (
                <PaymentDetailsPopup payment={selectedPayment} onClose={closePopup} />
            )}
        </div>
    );
};


const PaymentDetailsPopup = ({ payment, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <FiX size={24} />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-500">ID</span>
              <span className="text-sm text-gray-900">{payment.id}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-500">Amount</span>
              <span className="text-sm text-gray-900 font-semibold">${payment.amount}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-500">Date</span>
              <span className="text-sm text-gray-900">{new Date(payment.date).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-500">Status</span>
              <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-gray-500">User</span>
              <span className="text-sm text-gray-900">{payment.user}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;